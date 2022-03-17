var app = angular.module("Demo", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {

        $routeProvider.caseInsensitiveMatch = true;

        $routeProvider
            .when("/home", {
                template: "<h1>Template in action</h1>",
                controller: "homeController",
                controllerAs: "homeCtrl"
            })
            .when("/courses", {
                templateUrl: "Templates/courses.html",
                controller: "coursesController as coursesCtrl",

            })
            .when("/students", {
                templateUrl: "Templates/students.html",
                controller: "studentsController",
                controllerAs: "vm"
            })


            .when("/students/:id", {
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController as studentDetailsCtrl"
            })
            .when("/studentsSearch/:name?", {
                templateUrl: "Templates/studentsSearch.html",
                controller: "studentsSearchController",
                controllerAs: "studentsSearchCtrl"
            }) 


        /*.otherwise({
             redirectTo: "/home"
         })*/
        $locationProvider.html5Mode(true);
    })


    .controller("homeController", function () {
        this.message = "Home page";

    })
    .controller("coursesController", function () {

        this.courses = ["C#", "AngularJS", "Java", "SQL Server", "ASP.NET"];
    })

    .controller("studentsController", function ($http, $route, $location) {
        console.log('asd');
        var vm = this;

        vm.searchStudent = function () {
            if (vm.FullName) {
                $location.url("/studentsSearch/" + vm.FullName);
            }
            else {
                $location.url("/studentsSearch");
            }
        }



        vm.reloadData = function () {
            $route.reload();
        }
        $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
            .then(function (response) {
                vm.students = response.data;
            })
    })


    .controller("studentDetailsController", function ($http, $routeParams) {
        var vm = this;
        $http({
            url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
            method: "get",
            params: { ID: $routeParams.id }
        }).then(function (response) {
            vm.student = response.data[0];

        })
    })


    .controller("studentsSearchController", function ($http, $routeParams) {
        var vm = this;

        if ($routeParams.name) {
            $http({
                url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
                method: "get",
                params: { FullName: $routeParams.name }
            }).then(function (response) {
                vm.students = response.data;
            })
        }
        else {
            $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
                .then(function (response) {
                    vm.students = response.data;
                })
        }
    })