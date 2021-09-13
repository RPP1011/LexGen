function randomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateSyllable(position, consonants, vowels, sounds) {
    let result = "";
    let val = randomInRange(0, 3);
    let consonant = randomInRange(0, consonants.length);
    if (position == 1)
        result += val < 2 ? consonants[consonant] : "";
    else
        result += consonant;
    let vowel = randomInRange(0, vowels.length);
    let sound = randomInRange(0, sounds.length);
    result += vowels[vowel];
    result += Math.random() < 0.5 ? sounds[sound] : "";
    return result === undefined ? "" : result;
}
function printable(words) {
    for (let i = 0; i < words.length; i++) {
        if (words[i].length == 0)
            continue;
        let result = "";
        let word = words[i];
        let cleaned = word.replace("'", "");
        cleaned = word.replace(".", "");
        result += cleaned + " - ";
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
window.onload = () => {
    const outputBox = document.getElementById('outputBox');
    const form = document.getElementById('selection');
    console.log(form);
    form.onsubmit = () => {
        const formData = new FormData(form);
        const vowels = getSelectValues(document.getElementById('vowels'));
        const consonants = getSelectValues(document.getElementById('consonants'));
        const sounds = getSelectValues(document.getElementById('sounds'));
        const count = formData.get("word_count");
        const maxSyllables = formData.get("max");
        const minSyllables = formData.get("min");
        console.log({ vowels, consonants, sounds, count, minSyllables, maxSyllables });
        const words = generateWords(parseInt(count), parseInt(minSyllables), parseInt(maxSyllables), consonants, vowels, sounds);
        console.log(words);
        words.forEach(element => {
            outputBox.innerHTML += "<p>" + element + "</>";
        });
        return false; // prevent reload
    };
    return false;
};
function generateWords(count, minSyllables, maxSyllables, consonants, vowels, sounds) {
    const roots = new Set();
    while (roots.size < count) {
        let currentRoot = "";
        let syllableCount = randomInRange(minSyllables, maxSyllables);
        for (let j = 1; j <= syllableCount; j++) {
            if ((j > 1 && j < syllableCount - 1) || (j == syllableCount && syllableCount != 1))
                currentRoot += ".";
            else if (j == syllableCount - 1)
                currentRoot += "'";
            let syl = generateSyllable(j, consonants, vowels, sounds);
            console.log(syl);
            currentRoot += syl.replace("undefined", "");
        }
        roots.add(currentRoot);
    }
    const actualRoots = [];
    roots.forEach(element => {
        actualRoots.push(element);
    });
    actualRoots.sort();
    printable(actualRoots);
    return actualRoots;
}
//# sourceMappingURL=WordGenerator.js.map