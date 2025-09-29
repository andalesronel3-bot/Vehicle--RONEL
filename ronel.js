const vehicles = [
  { model: "Toyota Vios", type: "Car", mileage: 50000, fuelEfficiency: 15 },
  { model: "Honda Civic", type: "Car", mileage: 75000, fuelEfficiency: 14 },
  { model: "Isuzu D-Max", type: "Truck", mileage: 120000, fuelEfficiency: 10 },
  { model: "Yamaha Mio", type: "Motorcycle", mileage: 30000, fuelEfficiency: 40 },
  { model: "Suzuki Raider", type: "Motorcycle", mileage: 45000, fuelEfficiency: 35 }
];

// --- Functions ---
function getTotalMileage(fleet) {
  return fleet.reduce((total, v) => total + v.mileage, 0);
}

function filterByType(fleet, type) {
  return fleet.filter(v => v.type === type);
}

function getMostEfficient(fleet) {
  return fleet.reduce((best, v) => v.fuelEfficiency > best.fuelEfficiency ? v : best);
}

function groupByMileage(fleet) {
  return {
    low: fleet.filter(v => v.mileage < 50000),
    medium: fleet.filter(v => v.mileage >= 50000 && v.mileage < 100000),
    high: fleet.filter(v => v.mileage >= 100000)
  };
}

function fetchNewVehicles() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { model: "Ford Ranger", type: "Truck", mileage: 60000, fuelEfficiency: 12 },
        { model: "Kia Picanto", type: "Car", mileage: 20000, fuelEfficiency: 18 }
      ]);
    }, 2000);
  });
}

// --- Rendering Functions ---
function renderVehicleList(fleet, elementId) {
  const list = document.getElementById(elementId);
  list.innerHTML = ''; // Clear existing items
  fleet.forEach(v => {
    const li = document.createElement('li');
    li.textContent = `${v.model} (${v.type}) - Mileage: ${v.mileage}, Efficiency: ${v.fuelEfficiency} km/l`;
    list.appendChild(li);
  });
}

function renderTotalMileage(fleet, elementId) {
  const elem = document.getElementById(elementId);
  elem.textContent = getTotalMileage(fleet);
}

function renderMostEfficient(fleet, elementId) {
  const elem = document.getElementById(elementId);
  const best = getMostEfficient(fleet);
  elem.textContent = `${best.model} (${best.fuelEfficiency} km/l)`;
}

function renderGroupedByMileage(fleet) {
  const grouped = groupByMileage(fleet);
  ['low', 'medium', 'high'].forEach(range => {
    const list = document.getElementById(range + 'Mileage');
    list.innerHTML = '';
    grouped[range].forEach(v => {
      const li = document.createElement('li');
      li.textContent = `${v.model} - Mileage: ${v.mileage}`;
      list.appendChild(li);
    });
  });
}

// --- Initialize Page ---
function init() {
  renderVehicleList(vehicles, 'vehicleList');
  renderTotalMileage(vehicles, 'totalMileage');

  const cars = filterByType(vehicles, 'Car');
  renderVehicleList(cars, 'carsOnly');

  renderMostEfficient(vehicles, 'mostEfficient');
  renderGroupedByMileage(vehicles);

  // Fetch new vehicles asynchronously and update list
  fetchNewVehicles().then(newFleet => {
    renderVehicleList(newFleet, 'newVehicles');
  });
}

// Run initialization
window.onload = init;
