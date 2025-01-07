
const languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Python',
    description: "Python is a high-level, general-purpose programming language." + 
    "Its design philosophy emphasizes code readability with the use of significant indentation." +
    "Python is dynamically type-checked and garbage-collected. It supports multiple programming paradigms, " +
    "including structured (particularly procedural), object-oriented and functional programming. " +
    "It is often described as a 'batteries included' language due to its comprehensive standard library." +
    "Guido van Rossum began working on Python in the late 1980s as a successor to the ABC programming language " +
    "and first released it in 1991 as Python 0.9.0. Python 2.0 was released in 2000. " +
    "Python 3.0, released in 2008, was a major revision not completely backward-compatible with earlier versions. " +
    "Python 2.7.18, released in 2020, was the last release of Python 2. " +
    "Python consistently ranks as one of the most popular programming languages, " +
    "and has gained widespread use in the machine learning community."
  }
];

function truncate(description) {
  return description.split('.')[0] + '...';
 }

function showLess(e) {
  e.preventDefault();
  const showMoreButton = e.target.previousElementSibling;
  const languageDiv = e.target.parentElement;
  let p = languageDiv.querySelector('p');
  let languageDescription = languageDiv.querySelector('p').innerHTML;
  p.innerHTML = truncate(languageDescription);

  // show the 'show more' button
  showMoreButton.classList.remove('hidden');
  showMoreButton.classList.add('visible');

  // hide 'show less' button
  e.target.classList.remove('visible');
  e.target.classList.add('hidden');
}

function showMore(e) {
  e.preventDefault();
  const showLessButton = e.target.nextElementSibling;
  const languageName = e.target.parentElement.id;
  const languageDescription = e.target.parentElement.querySelector('p');
  languageDescription.innerHTML = languages.filter((language) => language.name === languageName)[0].description;
  
  // hide 'show more' button
  e.target.classList.remove('visible');
  e.target.classList.add('hidden');
  
  // show 'show less' button
  showLessButton.classList.remove('hidden');
  showLessButton.classList.add('visible');
}

document.addEventListener("DOMContentLoaded", function() {
  // start with truncated language descriptions
  const languageDescriptions = document.querySelectorAll('div#languages p');
  languageDescriptions.forEach(p => {
    p.innerHTML = truncate(p.innerHTML);
  });

  const showMoreButtons = document.querySelectorAll('a.visible');
  showMoreButtons.forEach(showButton => {
    showButton.addEventListener('click', showMore);
  });

  const showLessButtons = document.querySelectorAll('a.hidden');
  showLessButtons.forEach(hideButton => {
    hideButton.addEventListener('click', showLess);
  })
});

