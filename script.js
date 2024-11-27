document.addEventListener('DOMContentLoaded', () => {
    fetch('./exercises.json')
        .then(response => response.json())
        .then(exercises => {
            const container = document.getElementById('exercise-container');
            exercises.forEach((exercise, index) => {
                const exerciseDiv = document.createElement('div');
                exerciseDiv.classList.add('exercise');
                exerciseDiv.innerHTML = `
                    <h2>Exercice ${index + 1}: ${exercise.title}</h2>
                    <p>${exercise.description}</p>
                    <button onclick="showSolution(${index})">Voir la solution</button>
                    <pre id="solution-${index}" style="display:none;">${exercise.solution}</pre>
                `;
                container.appendChild(exerciseDiv);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des exercices:', error));
});

function showSolution(index) {
    const solution = document.getElementById(`solution-${index}`);
    solution.style.display = solution.style.display === 'none' ? 'block' : 'none';
}
