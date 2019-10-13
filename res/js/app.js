class User {
    constructor(firstname, lastname, birthdate, faculty, gpa) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.birthdate = birthdate;
        this.faculty = faculty;
        this.gpa = gpa;
    }
}

class Course {
    constructor(title, semester, grade) {
        this.title = title;
        this.semester = semester;
        this.grade = grade;
    }
}

$(document).ready(() => {
    // global counter for current index
    let tableIndex = 1;
    
    // populate Profile tab
    const user = new User('Aleksander', 'Avastu', '06/10/1997', 'Software engineering', 2.12);

    // populate Profile tab
    $('#name').html(user.firstname + ' ' + user.lastname);
    $('#birthdate').html(user.birthdate);
    $('#faculty').html(user.faculty);

    // empty the table
    $('#courses tbody').empty();
    
    // create courses array
    const courses = [
        new Course('Software for beginners', 1, 50),
        new Course('Software for seasoned devs', 2, 60),
        new Course('Software for professionals', 3, 70),
        new Course('Slack bot course', 2, 80),
    ]

    // populate table
    courses.forEach(course => populateTable(course));
    adjustGPA(calculateGPA());

    // populate table function
    function populateTable(entry) {

        $('#courses > tbody').append(`
            <tr>
                <td>${tableIndex}</td>
                <td>${entry.title}</td>
                <td>${entry.semester}</td>
                <td class="grade">${entry.grade}</td>
            </tr>
        `);
        
        tableIndex++;
    };

    $('#profile-button, #courses-button').on('click', e => {
        $('#profile-container').toggleClass('active');
        $('#courses-container').toggleClass('active');

        $('#profile-button').toggleClass('active');
        $('#courses-button').toggleClass('active');
    });

    $('#add-course-button').on('click', e => {
        const $span = $('#add-course');

        $span.is(':hidden') ? $span.css({ display: 'inline' }) : $span.css({ display: 'none' });
    });

    $('#save-course').on('click', e => {
        const data = $('#add-course input').map((index, value) => value.value);

        const course = new Course(...data);
        
        populateTable(course);

        // calc GPA
        const gpa = calculateGPA();
        adjustGPA(gpa);

        // reset form
        clearForm();
    });

    function calculateGPA() {
        const grades = $('.grade')
                        .map((index, value) => parseFloat($(value).text()))
                        .toArray();

        const points = grades.map(grade => gradeToPoints(grade));
        
        const amountOfCourses = points.length;

        const sumOfGrades = points.reduce((a, b) => a + b, 0);

        const gpa = (sumOfGrades / amountOfCourses).toFixed(2);

        return gpa || 0;
    }

    function gradeToPoints(grade) {
        let point = 0;
        
        if (grade > 90) {
            point = 4;
        } else if (grade > 80) {
            point = 3;
        } else if (grade > 70) {
            point = 2;
        } else if (grade > 60) {
            point = 1;
        } else if (grade > 50) {
            point = 0.5;
        } else if (grade <= 50) {
            point = 0;
        }
        return point;
    }

    function adjustGPA(gpa) {
        $('#gpa').html(`<strong>${gpa}</strong>`);
    }

    function clearForm() {
        $('#add-course input').each((index, value) => value.value = '');
    }

    $('#cancel-course').on('click', e => {
        clearForm();
        $('#add-course-button').click();
    });

});