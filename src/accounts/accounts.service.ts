import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { CheckBalanceDto } from './dto/check-balance.dto';
import { WithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class AccountsService {
  private readonly logger = new Logger(AccountsService.name);

  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async checkBalance(checkBalanceDto: CheckBalanceDto): Promise<{ balance: number; message: string }> {
    const { accountNumber, bankCode } = checkBalanceDto;
    
    this.logger.log(`Vérification du solde pour le compte: ${accountNumber} (${bankCode})`);
    
    const account = await this.findAccount(accountNumber, bankCode);
    
    this.logger.log(`Solde trouvé: ${account.balance}€ pour le compte ${accountNumber}`);
    
    return {
      balance: account.balance,
      message: `Votre solde est de ${account.balance} MGA`,
    };
  }

  async withdraw(withdrawDto: WithdrawDto): Promise<{ message: string; newBalance?: number }> {
    const { accountNumber, bankCode, amount } = withdrawDto;
    
    this.logger.log(`Tentative de retrait de ${amount}€ pour le compte: ${accountNumber} (${bankCode})`);
    
    const account = await this.findAccount(accountNumber, bankCode);
    
    if (account.balance < amount) {
      this.logger.warn(`Retrait refusé - Solde insuffisant: ${account.balance}€ < ${amount}€ pour le compte ${accountNumber}`);
      return {
        message: 'votre solde est insuffisant',
      };
    }
    
    // Effectuer le retrait
    account.balance -= amount;
    await this.accountRepository.save(account);
    
    this.logger.log(`Retrait effectué avec succès. Nouveau solde: ${account.balance}€ pour le compte ${accountNumber}`);
    
    return {
      message: 'retrait effectué avec succés',
      newBalance: account.balance,
    };
  }

  private async findAccount(accountNumber: string, bankCode: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: {
        accountNumber,
        bankCode,
      },
    });
    
    if (!account) {
      this.logger.error(`Compte non trouvé: ${accountNumber} (${bankCode})`);
      throw new NotFoundException('Compte non trouvé');
    }
    
    return account;
  }
}