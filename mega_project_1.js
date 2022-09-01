// Company Data
const indian9IT = [
  {
    name: 'Bình Chánh - BC',
    code: 'bcbc',
    revenue: 63530,
    marketCap: 8453370,
    employees: 3725,
    salesGrowth: 10.47,
    color: 'salmon',
    fb: 730890,
    tw: 439800,
    li: 4639844
  },
  {
    name: 'Bình Hưng - BC',
    code: 'bhbc',
    revenue: 151560,
    marketCap: 2820280,
    employees: 6080,
    salesGrowth: 9.81,
    color: 'coral',
    fb: 853447,
    tw: 419100,
    li: 3330921
  },
  {
    name: 'Hưng Long - BC',
    code: 'bchl',
    revenue: 132200,
    marketCap: 1533700,
    employees: 3500,
    salesGrowth: 24.74,
    color: 'khaki',
    fb: 1415863,
    tw: 438200,
    li: 2042198
  },
  {
    name: 'An Phú Tây - BC',
    code: 'bcapt',
    revenue: 276000,
    marketCap: 1530430,
    employees: 5715,
    salesGrowth: 4.82,
    color: 'turquoise',
    fb: 1446866,
    tw: 482100,
    li: 3115578
  },
  {
    name: 'Đa Phước - BC',
    code: 'bcdp',
    revenue: 31100,
    marketCap: 701410,
    employees: 8447,
    salesGrowth: 9.45,
    color: 'deepskyblue',
    fb: 131903,
    tw: 122400,
    li: 1629563
  },
  {
    name: 'Tân Phong - Q7',
    code: '7tp',
    revenue: 83240,
    marketCap: 293020,
    employees: 3150,
    salesGrowth: 17.34,
    color: 'violet',
    fb: 59883,
    tw: 141200,
    li: 675820
  },
  {
    name: 'Phường 5 - Q8',
    code: '8p5',
    revenue: 27740,
    marketCap: 177380,
    employees: 2200,
    salesGrowth: 8.33,
    color: 'lightpink',
    fb: 15213,
    tw: 7512,
    li: 313362
  },
  {
    name: 'Phường 12 - Quận Bình Thạnh',
    code: 'BT12',
    revenue: 60590,
    marketCap: 118550,
    employees: 2100,
    salesGrowth: 14.54,
    color: 'mistyrose',
    fb: 57914,
    tw: 82800,
    li: 432892
  }
];
// Company info
const list = d3.select('#list').selectAll('h3');
list.on('click', (event) => {
  indian9IT.forEach(company => {
    if (event.target.className == company.code) {
      // General info
      d3.select('#company').html(`Company: <span>${company.name}</span>`);
      d3.select('#revenue').node().innerHTML =
        `Rainfall (INR Mn): <span>${company.revenue.toLocaleString()}</span>`;
      d3.select('#marketcap').node().innerHTML =
        `Population (INR Mn): <span>${company.marketCap.toLocaleString()}</span>`;
      d3.select('#employees').node().innerHTML =
        `Dengue Case: <span>${company.employees.toLocaleString()}</span>`;
      d3.select('#salesgrowth').node().innerHTML =
        `Approdiate (3-year): <span>${company.salesGrowth}%</span>`;
      // Social info
      d3.select('#fb h2').node().innerText = 'Facebook';
      d3.select('#fb p').node().innerText = company.fb;
      d3.select('#tw h2').node().innerText = 'Twitter';
      d3.select('#tw p').node().innerText = company.tw;
      d3.select('#li h2').node().innerText = 'LinkedIn';
      d3.select('#li p').node().innerText = company.li;
    }
  });
});
// Set up the svgs
d3.select('#charts')
  .selectAll('div .chartarea')
  .append('svg')
  .attr('width', '500')
  .attr('height', '450')
  .attr('viewBox', '0 -450 500 450');

// Get svg dimensions
const SVGWIDTH = d3.select('svg').attr('width');
const SVGHEIGHT = d3.select('svg').attr('height');

// Track the checkboxes
const listCheck = d3.select('#list').selectAll('input');
let checkedValues = [];
listCheck.on('click', () => {
  // console.log(d3.event.target.checked);
  // console.log(d3.event.target.className)
  listCheck.each((d, i, n) => {
    checkedValues[i] = d3.select(n[i]).property('checked')
  });
  let checkedCompanies = [];
  for (let i = 0; i < checkedValues.length; i++) {
    if (checkedValues[i]) {
      checkedCompanies.push(indian9IT[i]);
    }
  }
  // console.log(checkedValues);
  // console.log(checkedCompanies);
  updateRevenueChart(checkedCompanies);
  updateMarketCapChart(checkedCompanies);
  updateEmployeeChart(checkedCompanies);
  updateGrowthChart(checkedCompanies);
});

// revenue
function updateRevenueChart(companies) {
  if (companies.length == 0) {
    resetTitle('#revenuechart');
    resetChart('#revenuechart');
    // resetChartText('#revenuechart');
  } else {
    setTitle('#revenuechart', 'Rainfall Day (mm)');
    setVerticalBars('#revenuechart', companies, 1, 'revenue');
    // setVerticalBarText('#revenuechart', companies, 'revenue');
  }
}

// market cap
function updateMarketCapChart(companies) {
  if (companies.length == 0) {
    resetTitle('#marketcapchart');
    resetChart('#marketcapchart');
    // resetChartText('#marketcapchart');
  } else {
    setTitle('#marketcapchart', 'Rainfall Week (mm)');
    setVerticalBars('#marketcapchart', companies, 42, 'marketCap');
    // setVerticalBarText('#marketcapchart', companies, 'marketCap');
  }
}

// employees
function updateEmployeeChart(companies) {
  if (companies.length == 0) {
    resetTitle('#employeechart');
    resetChart('#employeechart');
    // resetChartText('#employeechart');
  } else {
    setTitle('#employeechart', 'Population');
    setVerticalBars('#employeechart', companies, 1, 'employees');
    // setVerticalBarText('#employeechart', companies, 'employees');
  }
}

// growthrate
function updateGrowthChart(companies) {
  if (companies.length == 0) {
    resetTitle('#growthchart');
    resetChart('#growthchart');
    // resetChartText('#growthchart');
  } else {
    setTitle('#growthchart', 'Rainfall Month (mm)');
    setVerticalBars('#growthchart', companies, 0.0002, 'salesGrowth');
    // setVerticalBarText('#growthchart', companies, 'salesGrowth');
  }
}

// set title
function setTitle(seln, title) {
  d3.select(seln)
    .select('.charttitle')
    .text(title);
}
// reset title
function resetTitle(seln) {
  d3.select(seln)
    .select('.charttitle')
    .html(null);
}
// reset chart
function resetChart(seln) {
  d3.select(seln)
    .select('svg')
    .selectAll('rect')
    .remove();
}
// reset chart text
function resetChartText(seln) {
  d3.select(seln)
    .select('svg')
    .selectAll('text')
    .remove();
}

// set vertical bars
function setVerticalBars(seln, companies, factor, parameter) {
  // console.log(parameter);
  d3.select(seln)
    .select('svg')
    .selectAll('rect')
    .data(companies)
    .join('rect')
    .each((d, i, n) => {
      const elem = d3.select(n[i]);
      elem.attr('x', (SVGWIDTH / (2 * companies.length + 1)) * (2 * i + 1))
        .attr('y', -d[parameter] / (SVGHEIGHT * factor))
        .attr('width', SVGWIDTH / (2 * companies.length + 1))
        .attr('height', (d[parameter] / (SVGHEIGHT * factor)))
        .style('fill', d.color)
        .attr('rx', '5')
        .attr('ry', '5')
    });
}

// set vertical bar text
function setVerticalBarText(seln, companies) {
  d3.select(seln)
    .select('svg')
    .selectAll('text')
    .data(companies)
    .join('text')
    .each((d, i, n) => {
      const elem = d3.select(n[i]);
      elem.attr('x', (SVGWIDTH / (2 * companies.length + 1)) * (2 * i + 1) - 10)
        .attr('y', '0')
        .text(d => d.code.toUpperCase() + ' | ' + d[parameter].toLocaleString())
        .style('fill', 'darkslategray')
        .style('text-anchor', 'end')
        .style('font-size', '12')
        .style('font-weight', '500')
        .style('writing-mode', 'tb')
    });
}