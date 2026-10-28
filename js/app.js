
"use strict";

// Update the footer year automatically.
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Display a message in a result area.
function showResult(element, message, isError = false) {
  element.textContent = message;
  element.classList.add("show");
  element.classList.toggle("error", isError);
}

// Percentage calculator.
const percentageForm = document.getElementById("percentageForm");

percentageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const obtained = Number(
    document.getElementById("obtainedMarks").value
  );

  const total = Number(
    document.getElementById("totalMarks").value
  );

  const result = document.getElementById("percentageResult");

  if (
    !Number.isFinite(obtained) ||
    !Number.isFinite(total) ||
    obtained < 0 ||
    total <= 0 ||
    obtained > total
  ) {
    showResult(
      result,
      "Enter valid marks. Obtained marks cannot exceed total marks.",
      true
    );
    return;
  }

  const percentage = (obtained / total) * 100;

  showResult(
    result,
    `Your percentage is ${percentage.toFixed(2)}%.`
  );
});

// Simple CGPA average calculator.
const cgpaForm = document.getElementById("cgpaForm");

cgpaForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const input = document.getElementById("semesterGrades").value.trim();
  const result = document.getElementById("cgpaResult");

  if (!input) {
    showResult(result, "Enter your semester grade points.", true);
    return;
  }

  // Accept values separated by commas or whitespace.
  const parts = input.split(/[\s,]+/);

  const grades = parts.map(function (part) {
    return Number(part);
  });

  if (
    grades.some(function (grade, index) {
      return (
        parts[index] === "" ||
        !Number.isFinite(grade) ||
        grade < 0 ||
        grade > 10
      );
    })
  ) {
    showResult(
      result,
      "Enter valid grade points from 0 to 10, separated by commas or spaces.",
      true
    );
    return;
  }

  const average =
    grades.reduce(function (sum, grade) {
      return sum + grade;
    }, 0) / grades.length;

  showResult(
    result,
    `Your simple average is ${average.toFixed(2)} out of 10.`
  );
});
