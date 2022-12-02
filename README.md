# Gestion bancaire

## Objectifs

- Ajouter / Retirer des opérations
- Ajouter opérations réccurentes (qui se répète à la date X de chaque mois)
- Pouvoir créer des catégories de dépenses et ajouter la catégorie à une opération
- Calculer solde à chaque opération
- Connexion d'un utilisateur à un solde

## Schéma d'architecture

```plantuml
@startuml

rectangle "Gestion de comptes" as app {
    rectangle "API" {
        [API] --> [BDD (Oracle)]
        [API] --> [Swagger] : " /docs"
        [API] --> [Passport] : " /auth"
    }
    rectangle "UI" {
        [UI] --> [API] : " /api"
    }
}
    app ---> [GitHub]
    [GitHub] -> [Vercel] : "deployment"

@enduml
```

## Structure de données

```plantuml
@startuml

enum "TypeOperations" as typeoperations {
    + depense
    + gain
}

enum "TypeOperationsStatus" as typeoperationsstatus {
    + done
    + pending
}

class "User" as user {
    + id: uuid
    + last_name: string
    + first_name: string
    + mail: email
    + password: password
    + created_at: datetime
    + updated_at: datetime
}

class "Operations" as operations {
    + id: uuid
    + amount: float
    + date: datetime
    + created_at: datetime
    + updated_at: datetime
    + type_of: TypeOperations
    + status: TypeOperationsStatus
    + account: uuid
    + label: string
    + reccurent: boolean
    + end_date?: datetime
    + user: uuid
}

class "Account" as account {
    + id: uuid
    + label: string
    + created_at: datetime
    + updated_at: datetime
    + color: hex
}

class "UserAccount" as useraccount {
    + account: uuid
    + user: uuid
}

account <-- operations: " account"
user <- operations: " user"
typeoperations <-- operations
typeoperationsstatus <-- operations
account <--- useraccount: "account"
user <--- useraccount: "user"
@enduml
```