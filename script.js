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
                    
                    <button onclick="showDemo(${index})">Voir la démonstration</button>
                    <pre id="demo-${index}" style="display:none;">Démonstration en cours...</pre>
                    
                    <textarea id="answer-${index}" placeholder="Entrez votre réponse ici"></textarea>
                    <button onclick="submitAnswer(${index})">Soumettre la réponse</button>
                    <p id="feedback-${index}" style="display:none;">Merci pour votre réponse !</p>
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

function showDemo(index) {
    const demo = document.getElementById(`demo-${index}`);
    demo.style.display = demo.style.display === 'none' ? 'block' : 'none';
    if (demo.textContent === 'Démonstration en cours...') {
        demo.textContent = `Exemple de démonstration pour l'exercice ${index + 1}. Vous pouvez ajuster cela pour des démonstrations dynamiques.`;
    }
}

function submitAnswer(index) {
    const answer = document.getElementById(`answer-${index}`).value.trim();
    const feedback = document.getElementById(`feedback-${index}`);
    if (answer) {
        feedback.style.display = 'block';
        feedback.textContent = `Merci pour votre réponse : "${answer}". Continuez ainsi !`;
    } else {
        feedback.style.display = 'block';
        feedback.textContent = 'Veuillez entrer une réponse avant de soumettre.';
    }
}
