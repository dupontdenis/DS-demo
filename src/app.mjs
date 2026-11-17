import { etudiants } from "../data.mjs";

//1 Extraire uniquement les noms des étudiants.
const nomsEtudiants = etudiants.map((etudiant) => etudiant.nom);
console.log("Noms des étudiants :", nomsEtudiants);

//2 Ecrire une fonction qui renvoie la moyenne des notes d’un étudiant.
function calculerMoyenne(etudiant) {
  const somme = etudiant.notes.reduce((acc, note) => acc + note, 0);
  return Math.trunc((somme / etudiant.notes.length) * 100) / 100;
}

//3 Filtrer les étudiants admis moyenne>10
const etudiantsAdmis = etudiants.filter(
  (etudiant) => calculerMoyenne(etudiant) > 10,
);
console.log("Étudiants admis :", etudiantsAdmis);

//4 Dans un nouveau tableau d'étudiant, ajouter la moyenne à chaque étudiant
const etudiantsAvecResultat = etudiants.map((etudiant) => ({
  ...etudiant,
  moyenne: calculerMoyenne(etudiant),
}));
console.log("Étudiants avec resultat :", etudiantsAvecResultat);

//5 Regrouper les étudiants par resultat Ajourne [0-10[ Admis[10-20]
const etudiantsParL2 = Object.groupBy(etudiantsAvecResultat, (etudiant) =>
  etudiant.L2.toLowerCase(),
);
console.log("Étudiants par L2 :", etudiantsParL2);

//Écrire une fonction renderStudent(student) qui renvoie une chaîne HTML avec une template string. <li class="list-group-item data-nom="">...</li> avec le nom de l’étudiant et la classe list-group-item-danger si la moyenne est < 10 ou list-group-item-primary si la moyenne est >= 10.
function renderStudent(etudiant) {
  const resultat =
    etudiant.moyenne < 10
      ? "list-group-item-danger"
      : "list-group-item-primary";
  return `<li class="list-group-item ${resultat}" data-nom="${etudiant.nom}">${etudiant.nom} - moyenne : ${etudiant.moyenne}/20</li>`;
}

//Écrire une fonction renderGroupREsultat(group) qui renvoie une chaîne HTML avec une template string. <ul class="list-group">...</ul> avec les étudiants du groupe.
function renderGroupResult(group) {
  const studentsHTML = group.map(renderStudent).join("");
  return `<ul class="list-group">${studentsHTML}</ul>`;
}

//Écrire une fonction renderAllGroups(groups) qui renvoie une chaîne HTML avec une template string. <div class="group">...</div> avec les groupes d'étudiants.
function renderAllGroups(groups) {
  return Object.entries(groups)
    .map(([resultat, group]) => {
      return `<div class="group"><h2>${resultat}</h2>${renderGroupResult(group)}</div>`;
    })
    .join("");
}

document.getElementById("resultats").innerHTML = `
  <h2>Résultats</h2>
  <p><strong>Noms des étudiants :</strong> ${nomsEtudiants.join(", ")}</p>
  <p><strong>Étudiants admis :</strong> ${etudiantsAdmis
    .map((etudiant) => etudiant.nom)
    .join(", ")}</p>
  <h3>Moyennes</h3>
  <ul class="list-group">
    ${etudiantsAvecResultat
      .map(
        (etudiant) =>
          `<li class="list-group-item">${etudiant.nom} : ${etudiant.moyenne}/20</li>`,
      )
      .join("")}
  </ul>
`;

document.getElementById("app").innerHTML = renderAllGroups(etudiantsParL2);

//Écrire un écouteur d’événement sur list-group-item qui affiche dans un id=detail avec le nom de l’étudiant et sa moyenne par delegation
document.getElementById("app").addEventListener("click", (event) => {
  const li = event.target.closest("li.list-group-item");
  if (li) {
    const nomEtudiant = li.dataset.nom;
    const etudiant = etudiantsAvecResultat.find(
      (etudiant) => etudiant.nom === nomEtudiant,
    );
    console.log("Étudiant sélectionné :", etudiant);
    document.getElementById("detail").innerHTML =
      `<p><strong>${nomEtudiant}</strong> - notes: ${etudiant.notes.join(", ")}</p>`;
  }
});
