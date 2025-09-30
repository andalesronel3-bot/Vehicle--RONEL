// Sample vehicle fleet
const vehicles = [
  { model: "Toyota Corolla", type: "Sedan", mileage: 50000, fuelEfficiency: 15 },
  { model: "Ford F-150", type: "Truck", mileage: 70000, fuelEfficiency: 10 },
  { model: "Honda Civic", type: "Sedan", mileage: 40000, fuelEfficiency: 18 },
  { model: "Chevy Tahoe", type: "SUV", mileage: 60000, fuelEfficiency: 12 },
  { model: "Tesla Model 3", type: "Electric", mileage: 30000, fuelEfficiency: 25 },
  { model: "Nissan Altima", type: "Sedan", mileage: 45000, fuelEfficiency: 16 },
  { model: "Jeep Wrangler", type: "SUV", mileage: 55000, fuelEfficiency: 11 },
  { model: "Ford Mustang", type: "Coupe", mileage: 35000, fuelEfficiency: 14 },
  { model: "Toyota Prius", type: "Hybrid", mileage: 25000, fuelEfficiency: 22 },
  { model: "Rivian R1T", type: "Electric Truck", mileage: 15000, fuelEfficiency: 21 }
];

// 1. Calculate total mileage
function getTotalMileage(vehicles) {
  return vehicles.reduce((total, v) => total + v.mileage, 0);
}

// 2. Filter vehicles by type
function filterByType(vehicles, type) {
  return vehicles.filter(v => v.type === type);
}

// 3. Find the most fuel-efficient vehicle
function getMostEfficientVehicle(vehicles) {
  return vehicles.reduce((best, v) => v.fuelEfficiency > best.fuelEfficiency ? v : best);
}

// 4. Group vehicles by mileage ranges
function groupByMileage(vehicles) {
  const groups = { low: [], medium: [], high: [] };
  vehicles.forEach(v => {
    if (v.mileage < 40000) groups.low.push(v);
    else if (v.mileage < 60000) groups.medium.push(v);
    else groups.high.push(v);
  });
  return groups;
}

// 5. Simulate fetching new vehicles asynchronously
function fetchNewVehicles() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { model: "Hyundai Elantra", type: "Sedan", mileage: 20000, fuelEfficiency: 20 },
        { model: "Mazda CX-5", type: "SUV", mileage: 18000, fuelEfficiency: 17 }
      ]);
    }, 2000); // Simulates 2 second delay
  });
}

// --- Example Usage ---
console.log("Total Mileage:", getTotalMileage(vehicles));
console.log("Sedans:", filterByType(vehicles, "Sedan"));
console.log("Most Efficient:", getMostEfficientVehicle(vehicles));
console.log("Grouped by Mileage:", groupByMileage(vehicles));

fetchNewVehicles().then(newV => {
  console.log("Fetched Vehicles:", newV);
});