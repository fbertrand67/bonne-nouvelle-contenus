# Contenus de Bonne Nouvelle

Ce dépôt contient les contenus **en ligne** de l'app Bonne Nouvelle : citations, faits, défis…
L'app les télécharge (au plus toutes les 12 h) et les ajoute à sa banque intégrée.
**Modifier ce fichier suffit : pas besoin de republier l'app.**

Adresse lue par l'app : `https://fbertrand67.github.io/bonne-nouvelle-contenus/contenus.json`

## Ajouter un contenu

Dans [`contenus.json`](contenus.json), ajoute un élément à la liste `items` :

```json
{
  "id": "r-042",
  "category": "motivation",
  "type": "quote",
  "text": {
    "fr": "Texte en français",
    "en": "English text",
    "es": "Texto en español",
    "de": "Deutscher Text"
  }
}
```

| Champ | Règle |
|---|---|
| `id` | Unique, commence par `r-`. Ne réutilise jamais l'id d'un contenu supprimé. |
| `category` | `motivation`, `humour`, `bien-etre`, `developpement`, `curiosite`, `defi`, `planete` ou `monde` |
| `type` | `quote` (citation), `fact` (le saviez-vous ?), `challenge` (défi) ou `actu` |
| `text` | Les 4 langues sont obligatoires : `fr`, `en`, `es`, `de`. |
| `from` / `until` | Facultatifs, format `AAAA-MM-JJ`, bornes incluses : le contenu n'est proposé que pendant cette période (Noël, fête des mères…). |

Un élément invalide est ignoré par l'app (les autres restent utilisés) ; un fichier illisible est ignoré en entier et l'app garde la version précédente.

## Vérifier avant de publier

```bash
node valider.mjs
```

La même vérification tourne automatiquement sur GitHub à chaque modification (onglet **Actions**) : une croix rouge signale une erreur à corriger.

## Bon à savoir

- Après publication, compte quelques minutes pour GitHub Pages, puis jusqu'à 12 h pour que les téléphones voient le changement.
- Retirer un contenu ne casse rien : ceux déjà affichés ou gardés en favoris restent lisibles.
- Les faits doivent être vérifiés : l'app les présente comme vrais.

## Politique de confidentialité

Les pages [`confidentialite.html`](confidentialite.html) (FR) et [`privacy.html`](privacy.html) (EN) sont la politique de confidentialité de l'app, ouverte depuis ses Réglages et indiquée dans la Play Console :
`https://fbertrand67.github.io/bonne-nouvelle-contenus/confidentialite.html`
