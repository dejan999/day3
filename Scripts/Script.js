var app = angular.module("Demo", ["ui.router"])
    .config(function ($stateProvider) {

        //$routeProvider.caseInsensitiveMatch = true;

        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "Templates/home.html",
                controller: "homeController",
                controllerAs: "homeCtrl"
            })
            .state("courses", {
                url: "/courses",
                templateUrl: "Templates/courses.html",
                controller: "coursesController as coursesCtrl",

            })
            .state("students", {
                url: "/students",
                templateUrl: "Templates/students.html",
                controller: "studentsController",
                controllerAs: "vm",
                resolve: {
                    studentslist: function ($http) {
                        return $http.get("https://mysafeinfo.com/api/data?list=presidents&format=json&case=default")
                            .then(function (response) {
                                return response.data;
                            })
                    }
                }
            })
            .state("student", {
                url: "/student/{id:string}",
                templateUrl: "Templates/studentDetails.html",
                controller: "studentDetailsController",
                controllerAs:"studentDetailsCtrl"
            })

            .state("studentsSearch", {
                url: "/studentsSearch/:name",
                templateUrl: "Templates/studentsSearch.html",
                controller: "studentsSearchController",
                controllerAs: "studentsSearchCtrl"
            })
            
/*
    .otherwise({
         redirectTo: "/home"
     })
    $locationProvider.html5Mode(true);*/

    })
    .controller("homeController", function () {
        this.message = "Home page";

    })
    .controller("coursesController", function () {

        this.courses = ["C#", "AngularJS", "Java", "SQL Server", "ASP.NET"];
    })

    .controller("studentsController", function (studentslist, $state, $location) {
        var vm = this;
    
        vm.studentSearch = function (d) {
            $state.go("studentsSearch", { name: d });
            console.log(d);
        }
        
        vm.studentDetails = function (f) {
            console.log(f);
            $state.go("student", { id: f });
        }
        
        vm.reloadData = function () {
            $state.reload();
        }

    
        vm.students = studentslist;
    })



    .controller("studentDetailsController", function ($http, $stateParams) {
        var vm = this;

        
        $http({
            url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
            method: "get",
            params: { ID: $stateParams.id }
        }).then(function (response) {
            vm.student = response.data;
            
        })

    })
    .controller("studentsSearchController", function ($http, $stateParams) {
        var vm = this;
    
        if ($stateParams.name) {
            $http({
                url: "https://mysafeinfo.com/api/data?list=presidents&format=json&case=default",
                method: "get",
                params: { FullName: $stateParams.name }
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