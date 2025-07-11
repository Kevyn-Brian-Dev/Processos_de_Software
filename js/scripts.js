const generatePasswordButton = document.querySelector("#generate-password");
const generatedPasswordElement = document.querySelector("#generated-password");
const includeNumbersCheckbox = document.querySelector("#include-numbers");
const includeSymbolsCheckbox = document.querySelector("#include-symbols");
const includeLowercaseCheckbox = document.querySelector("#include-lowercase");
const includeUppercaseCheckbox = document.querySelector("#include-uppercase");


const getLetterLowerCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getLetterUpperCase = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbol = () => {
    const symbols = "!@#$%^&*()_+-={}[]:;'<>?/";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generatePassword = () => {
    let password = "";
    const passwordLength = 10;

    const generators = [];

    if (includeLowercaseCheckbox.checked) {
        generators.push(getLetterLowerCase);
    }
    if (includeUppercaseCheckbox.checked) {
        generators.push(getLetterUpperCase);
    }
    if (includeNumbersCheckbox.checked) {
        generators.push(getNumber);
    }
    if (includeSymbolsCheckbox.checked) {
        generators.push(getSymbol);
    }

    if (generators.length === 0) {
        alert("Por favor, selecione pelo menos uma opção! para gerar uma senha.");
        generatedPasswordElement.style.display = "none";
        if (copyPasswordIcon) copyPasswordIcon.style.display = "none"; 
        return;
    }

    for (let i = 0; i < passwordLength; i++) {
        const randomGenerator = generators[Math.floor(Math.random() * generators.length)];
        password += randomGenerator();
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    password = password.slice(0, passwordLength);

    generatedPasswordElement.style.display = "block";
    generatedPasswordElement.querySelector("h4").innerText = password;

    document.querySelector("#password").value = password;
};

generatePasswordButton.addEventListener("click", () => {
    generatePassword();
});

function mostrarOcultarSenha() {
    const senhaInput = document.getElementById("password");
    const icone = document.getElementById("icone-olho");

    if(senhaInput.type === "text") {
        senhaInput.type = "password";
        icone.src = "img/ocultar.png";
    } else {
        senhaInput.type = "text";
        icone.src = "img/visualizar.png";
    }
}

function copiarSenha() {
    const senhaInput = document.getElementById("password");
    const iconeCopy = document.getElementById("icone-copiar");

    senhaInput.select();
    senhaInput.setSelectionRange(0, 99999);
    document.execCommand("copy");

    iconeCopy.src = "img/copiado.png";

    setTimeout(() => {
      iconeCopy.src = "img/copiar.png";
    }, 1000);
}

