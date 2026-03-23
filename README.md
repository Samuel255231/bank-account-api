# Lancement du projet avec Docker
##  1. Construire et démarrer les conteneurs
```
docker-compose up --build
```

## Pour exécuter en arrière-plan
```
docker-compose up -d --build
```

## 2. Vérifier que les conteneurs sont en cours d'exécution
```
docker-compose ps
```

## 3. Voir les logs
```
docker-compose logs -f api
```

## 4. Arrêter les conteneurs
```
docker-compose down
```

## Pour supprimer également les volumes (données)
```
docker-compose down -v
```

# Étape 18: Tester l'API

## 1.a. Tester la vérification de solde:
```
curl -X POST http://localhost:3000/accounts/check-balance \
  -H "Content-Type: application/json" \
  -d '{
    "accountNumber": "FR76123456789",
    "bankCode": "30001"
  }'
```

## 1.b. Réponse attendue:

{
  "balance": 1500.5,
  "message": "Votre solde est de 1500.5 MGA"
}

# 2.a. Tester un retrait:
```
curl -X POST http://localhost:3000/accounts/withdraw \
  -H "Content-Type: application/json" \
  -d '{
    "accountNumber": "FR76123456789",
    "bankCode": "30001",
    "amount": 100
  }'
```

# 2.b. Réponse attendue (si solde suffisant):
```
{
  "message": "retrait effectué avec succés",
  "newBalance": 1400.5
}
```

## 3.a. Tester un retrait avec solde insuffisant:
```
curl -X POST http://localhost:3000/accounts/withdraw \
  -H "Content-Type: application/json" \
  -d '{
    "accountNumber": "FR76876543210",
    "bankCode": "30002",
    "amount": 100
  }'
```

## 3.b. Réponse attendue:
```
{
  "message": "votre solde est insuffisant"
}
```

# Accès à pgAdmin
# 1. Ouvrez votre navigateur et allez sur http://localhost:5050
- Connectez-vous avec: 
Email: admin@bank.com
Mot de passe: admin123
- Ajoutez un nouveau serveur:
Nom: Bank Account DB
Host: postgres
Port: 5432
Database: bank_account_db
Username: postgres
Password: postgres

## Structure finale du projet
```
bank-account-api/
├── src/
│   ├── accounts/
│   │   ├── dto/
│   │   │   ├── check-balance.dto.ts
│   │   │   └── withdraw.dto.ts
│   │   ├── entities/
│   │   │   └── account.entity.ts
│   │   ├── accounts.controller.ts
│   │   ├── accounts.service.ts
│   │   └── accounts.module.ts
│   ├── database/
│   │   └── database.module.ts
│   ├── config/
│   ├── app.module.ts
│   └── main.ts
├── init.sql
├── Dockerfile
├── docker-compose.yml
├── .env
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── nest-cli.json
```