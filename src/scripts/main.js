'use strict';

const table = document.querySelector('table');
const tbody = table.querySelector('tbody');
const th = document.querySelectorAll('thead th');

th.forEach((thItem, thIndex) => {
  thItem.addEventListener('click', () => {
    // Визначити напрямок сортування
    const direction = thItem.dataset.direction === 'asc' ? 'desc' : 'asc';

    thItem.dataset.direction = direction;

    // Отримати всі рядки
    const rows = Array.from(tbody.querySelectorAll('tr'));

    // Сортувати рядки
    rows.sort((a, b) => {
      const cellA = a.cells[thIndex].textContent.trim();
      const cellB = b.cells[thIndex].textContent.trim();

      const numA = Number(cellA.replace(/[$,]/g, ''));
      const numB = Number(cellB.replace(/[$,]/g, ''));

      const isNumberA = !isNaN(numA) && numA !== 0 && cellA.match(/^\d/);
      const isNumberB = !isNaN(numB) && numB !== 0 && cellB.match(/^\d/);

      if (isNumberA && isNumberB) {
        return direction === 'asc' ? numA - numB : numB - numA;
      }

      return direction === 'asc'
        ? cellA.localeCompare(cellB)
        : -cellA.localeCompare(cellB);
    });

    // Перевставити відсортовані рядки
    rows.forEach((row) => tbody.appendChild(row));
  });
});

// Виділення рядка при кліку
tbody.addEventListener('click', (e) => {
  const clickedRow = e.target.closest('tr');
  const selectedRow = tbody.querySelector('.active');

  if (!clickedRow) {
    return;
  }

  if (selectedRow) {
    selectedRow.classList.remove('active');
  }

  clickedRow.classList.add('active');
});

// form

// створюю form
const form = document.createElement('form');

// додаю до неї class = "new-employee-form"
form.classList.add('new-employee-form');

// додаю усі label у один масив для того 
// щоб використати їх та присвоїти значення

const fields = [
  {
    label: 'Name:',
    type: 'text',
    id: 'Name',
    qa: 'name',
  },
  {
    label: 'Position:',
    type: 'text',
    id: 'Position',
    qa: 'position',
  },
  {
    label: 'Office:',
    type: 'text',
    id: 'office',
    qa: 'office',
  },
  {
    label: 'Age:',
    type: 'number',
    id: 'Age',
    qa: 'age',
  },
  {
    label: 'Salary:',
    type: 'number',
    id: 'Salary',
    qa: 'salary',
  },
];

// через forEach витягую значення з кожного
// fields та додаю їх до label та input

fields.forEach((field) => {
  // тут створюю сам label
  const label = document.createElement('label');

  label.textContent = field.label;
  // присвоюю значення яке у масиві fields до label
  // (значення попадає туди через парамент field
  // який я додаю у forEach)

  if (field.id === 'office') {
    const select = document.createElement('select');

    select.name = field.qa;
    select.setAttribute('data-qa', field.qa);
    select.setAttribute('autocomplete', field.qa);

    const cities = [
      'Tokyo',
      'Singapore',
      'London',
      'New York',
      'Edinburgh',
      'San Francisco',
    ];

    cities.forEach((city) => {
      const option = document.createElement('option');

      option.value = city;
      option.textContent = city;
      select.appendChild(option);
    });

    label.appendChild(select);
  } else {
    const input = document.createElement('input');

    input.type = field.type;
    input.name = field.qa;
    input.setAttribute('data-qa', field.qa);
    input.setAttribute('autocomplete', field.qa);

    label.appendChild(input);
  }

  // тут додаю labet та input до form

  form.appendChild(label);
  document.body.append(form);
});
//
