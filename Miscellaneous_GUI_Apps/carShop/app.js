const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];

const App = {
  init() {
    this.cacheElements();
    this.registerPartials();
    this.compileTemplates();
    this.renderFilters();
    this.renderCars();
  },

  cacheElements() {
    this.carsTemplate = document.getElementById('cars_template').innerHTML;
    this.carTemplate = document.getElementById('car_template').innerHTML;
    this.filterTemplate = document.getElementById('filter_template').innerHTML;
    this.carsGallery = document.getElementById('cars');
    this.filters = document.getElementById('filters');
  },

  registerPartials() {
    Handlebars.registerPartial('car_template', this.carTemplate);
  },

  compileTemplates() {
    this.compiledCarsTemplate = Handlebars.compile(this.carsTemplate);
    this.compiledFilterTemplate = Handlebars.compile(this.filterTemplate);
  },
 
  renderCars() {
    let filteredCars = this.applyFilters();
    console.log('filteredCars in render function', filteredCars);
    const compiledCarsHTML = this.compiledCarsTemplate({ cars: filteredCars });
    this.carsGallery.innerHTML = compiledCarsHTML;
  },

  generateFilters() {
    const makes = [...new Set(cars.map(car => car.make))];
    makes.sort();

    const models = [...new Set(cars.map(car => car.model))];
    models.sort();

    const years = [...new Set(cars.map(car => car.year))];
    years.sort((a, b) => a - b);

    const prices = [...new Set(cars.map(car => car.price))];
    prices.sort((a, b) => (a - b));

    return { makes: makes, models: models, years: years, prices: prices };
  },

  renderFilters() {
    const compiledFiltersHTML = this.compiledFilterTemplate(this.generateFilters());
    this.filters.innerHTML = compiledFiltersHTML;
    const filterButton = document.getElementById('filter_btn');
    filterButton.addEventListener('click', this.renderCars.bind(this));
  },

  applyFilters() {
    let makeFilter = document.getElementById('make_select');
    let makeValue = makeFilter.options[makeFilter.selectedIndex].value;

    let modelFilter = document.getElementById('model_select');
    let modelValue = modelFilter.options[modelFilter.selectedIndex].value;

    let priceFilter = document.getElementById('price_select');
    let priceValue = priceFilter.options[priceFilter.selectedIndex].value;

    let yearFilter = document.getElementById('year_select');
    let yearValue = yearFilter.options[yearFilter.selectedIndex].value;
    
    let filters = {};
    if (makeValue) filters.make = makeValue;
    if (modelValue) filters.model = modelValue;
    if (priceValue) filters.price = Number(priceValue);
    if (yearValue) filters.year = Number(yearValue);

    console.log('filters: ', filters);
    return this.filterCars(filters);
  },

  filterCars(filters) {
    let filteredCars = cars;

    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        if (typeof(filters[key]) === 'number') {
          filteredCars = filteredCars.filter(car => car[key] <= filters[key]);
        } else {
          filteredCars = filteredCars.filter(car => car[key] === filters[key]); 
        }
      }
    });

    console.log(filteredCars);
    return filteredCars;
  },
};

App.init();