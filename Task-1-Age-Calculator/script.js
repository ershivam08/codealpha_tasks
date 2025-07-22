document.getElementById("ageForm").addEventListener("submit", function (e) {
  e.preventDefault();

  document.getElementById("result").style.display = "none";
  document.getElementById("error").style.display = "none";
  const day = parseInt(document.getElementById("day").value);
  const month = parseInt(document.getElementById("month").value);
  const year = parseInt(document.getElementById("year").value);

  if (!isValidDate(day, month, year)) {
    showError("Please enter a valid date");
    return;
  }

  // calculate agee
  const age = calculateAge(day, month, year);

  // display result
  if (age) {
    showResult(age);
  } else {
    showError("Invalid date or future date entered");
  }
});

function isValidDate(day, month, year) {
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
    return false;
  }

  if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30) {
    return false;
  }

  if (month === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    if (day > (isLeapYear ? 29 : 28)) {
      return false;
    }
  }

  return true;
}

function calculateAge(day, month, year) {
  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  if (birthDate > today) {
    return null;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    ageDays += lastMonth.getDate();
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  return {
    years: ageYears,
    months: ageMonths,
    days: ageDays,
  };
}

function showResult(age) {
  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `
        <h3>Your Age</h3>
        <p><strong>${age.years}</strong> years, <strong>${age.months}</strong> months, and <strong>${age.days}</strong> days</p>
    `;
  resultElement.style.display = "block";
}

function showError(message) {
  const errorElement = document.getElementById("error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}
