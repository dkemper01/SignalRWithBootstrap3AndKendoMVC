function PersonCtrl($scope) {
    $scope.people = [
    ];

    $scope.addPerson = function (id, firstName, lastName, postalCode, email) {
        $scope.people.push({ Id: id, FirstName: firstName, LastName: lastName, PostalCode: postalCode, Email: email });
    };

    $scope.popPerson = function () {
        if ($scope.people.length > 0) {
            $scope.people.pop();
        }
    }
}