
function randomInRange(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generateSyllable(position: number, consonants: string[], vowels: string[], sounds: string[]) {
    let result: string = "";
    let val: number = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    let consonant: number = Math.floor(Math.random() * (consonants.length - 0 + 1)) + 0;
    if (position == 1) result += val < 2 ? consonants[consonant] : "";
    else result += consonant;

    let vowel: number = randomInRange(0, vowels.length);
    let sound: number = randomInRange(0, sounds.length);

    result += vowels[vowel];
    result += Math.random() < 0.5 ? sounds[sound] : "";
    return result;
}

function printable(words: string[]) {
    for (let i = 0; i < words.length; i++) {
        if (words[i].length == 0) continue;
        let result: string = "";
        let word = words[i];
        let cleaned: string = word.replace("'", "");
        cleaned = word.replace(".", "");
        result += cleaned + " - "
        result += '[' + word + ']';
        words[i] = result;
    }
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.text);
        }
    }
    return result;
}

const form: HTMLFormElement = document.querySelector('#selection');
const outputBox: HTMLFormElement = document.querySelector('#outputBox');

form.onsubmit = () => {
    const formData = new FormData(form);

    const vowels = getSelectValues(document.querySelector('#vowels')) as string[];
    const consonants = getSelectValues(document.querySelector('#consonants')) as string[];
    const sounds = getSelectValues(document.querySelector('#sounds')) as string[];
    const count = formData.get("word_count") as string;
    const maxSyllables = formData.get("max") as string;
    const minSyllables = formData.get("min") as string;

    const words = generateWords(Number.parseInt(count),
        Number.parseInt(minSyllables),
        Number.parseInt(maxSyllables),
        consonants,
        vowels,
        sounds);
    words.forEach(element => {
        outputBox.innerHTML += "<p>" + element + "</>";
    });
    return false; // prevent reload
};

function generateWords(count: number, minSyllables: number, maxSyllables: number, consonants: string[], vowels: string[], sounds: string[]): string[] {
    const roots = new Set<string>();
    while (roots.size < count) {
        let currentRoot = "";
        let syllableCount = randomInRange(minSyllables, maxSyllables);

        for (let j = 1; j <= syllableCount; j++) {
            if ((j > 1 && j < syllableCount - 1) || (j == syllableCount && syllableCount != 1)) currentRoot += ".";
            else if (j == syllableCount - 1) currentRoot += "'";

            currentRoot += generateSyllable(j, consonants, vowels, sounds);
        }
        roots.add(currentRoot)
    }
    const actualRoots:string[] = [];
    roots.forEach(element => {
        actualRoots.push(element);
    });
    actualRoots.sort();
    printable(actualRoots)
    return actualRoots;
}