let improvedPromptText = "";

function debugPrompt() {

    const prompt =
    document.getElementById("promptInput").value;

    if(prompt.trim()===""){
        alert("Please enter a prompt.");
        return;
    }

    let score = 0;
    let missing = [];

    // Role
    if(prompt.toLowerCase().includes("act as")){
        score += 20;
    } else {
        missing.push("Role");
    }

    // Context
    if(prompt.toLowerCase().includes("for")){
        score += 20;
    } else {
        missing.push("Context");
    }

    // Goal
    if(prompt.length > 20){
        score += 20;
    } else {
        missing.push("Goal");
    }

    // Constraints
    if(prompt.match(/\d+/)){
        score += 20;
    } else {
        missing.push("Constraints");
    }

    // Format
    if(
        prompt.toLowerCase().includes("table") ||
        prompt.toLowerCase().includes("bullet") ||
        prompt.toLowerCase().includes("markdown")
    ){
        score += 20;
    } else {
        missing.push("Output Format");
    }

    // Prompt Type
    let promptType = "General";

    if(prompt.toLowerCase().includes("website") ||
       prompt.toLowerCase().includes("code")){
        promptType = "Coding";
    }

    if(prompt.toLowerCase().includes("resume") ||
       prompt.toLowerCase().includes("cv")){
        promptType = "Career";
    }

    if(prompt.toLowerCase().includes("blog") ||
       prompt.toLowerCase().includes("article")){
        promptType = "Writing";
    }

    // Complexity
    let complexity = "Beginner";

    if(score >= 40) complexity = "Intermediate";
    if(score >= 60) complexity = "Advanced";
    if(score >= 80) complexity = "Expert";

    improvedPromptText = `
Act as an expert.

Task:
${prompt}

Requirements:
- Be detailed
- Include examples
- Use clear language

Output Format:
- Use headings
- Use bullet points
- Keep response structured
`;

    document.getElementById("results").innerHTML = `
        <h2>Results</h2>

        <p><strong>Prompt Type:</strong> ${promptType}</p>

        <p><strong>Complexity:</strong> ${complexity}</p>

        <p><strong>Score:</strong> ${score}/100</p>

        <p><strong>Missing Elements:</strong>
        ${missing.join(", ") || "None"}
        </p>

        <h3>Improved Prompt</h3>

        <textarea id="generatedPrompt">${improvedPromptText}</textarea>
    `;
}

function copyPrompt(){

    navigator.clipboard.writeText(improvedPromptText);

    alert("Improved prompt copied!");
}