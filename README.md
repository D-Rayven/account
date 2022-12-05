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

class "Member" as member {
    + id: uuid
    + lastName: string
    + firstName: string
    + email: email
    + password: password
    + createdAt: datetime
    + updatedAt: datetime
}

class "Operations" as operations {
    + id: uuid
    + label: string
    + createdAt: datetime
    + updatedAt: datetime
    + amount: float
    + date: datetime
    + typeOf: TypeOperations
    + status: TypeOperationsStatus
    + reccurent: boolean
    + end_date?: datetime
    + accountId: uuid
    + memberId: uuid
}

class "Account" as account {
    + id: uuid
    + label: string
    + created_at: datetime
    + updated_at: datetime
    + color: hex
}

class "MemberAccount" as memberaccount {
    + account: uuid
    + member: uuid
}

account <-- operations: " account"
member <- operations: " member"
typeoperations <-- operations
typeoperationsstatus <-- operations
account <--- memberaccount: "account"
member <--- memberaccount: "member"
@enduml
```