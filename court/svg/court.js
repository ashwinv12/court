'use strict';

var app = window.angular.module('court', []);

app.controller('CourtCtrl', ['$scope',
	function($scope) {

		$scope.players = [
			{
				name: 'Tim',
				color: '#FF0000',
				number: '1',
			},
			{
				name: 'Rhead',
				color: '#00FF00',
				number: '13'
			},
			{
				name: 'Blaine',
				color: '#0000FF',
				number: '27'
			}
		];

		$scope.currentPlayer = 0;

		$scope.setCurrentPlayer = function(index) { // Sets the active player
			$scope.currentPlayer = index;
		};
		



	}]);

app.directive('court',
	function() {
		return {
			restrict: 'E',
			templateUrl: 'court.html',
			replace: true,
			controller: function($scope){
				$scope.allshots = [];

				$scope.twosmade = 0; // Number of 2's made
				$scope.threesmade = 0; // Number of 3's made
				$scope.shots = 0;  // Total shots taken (made or missed)
				$scope.threepointshots = 0; // Total 3's taken (made or missed)
				$scope.addingMadeShots = true; // Default shots added are made
				$scope.removingShots = false;  // Adding shots by default, not removing
				$scope.showingValues = false;  // Not showing shot values by default 


				$scope.addCircle = function(value, $event) {   // Adding made or missed shots
					if (!$scope.removingShots) {
						if ($scope.addingMadeShots) {
							shotMade(value, $event);
						} else {
							shotMissed(value, $event);
						}
					}
					
				}

				var shotMade = function(value, $event) { // Adds made shots
						$scope.allshots.push({    // Pushes shot into array                   
							x: $event.offsetX / ($scope.size / 100),
							y: $event.offsetY / ($scope.size / 100),
							color: '#CCFBA8',
							strokeColor: '#87B864',
							value: value,
							type: 'made'
						});
						
						if (value === 2) {
							$scope.twosmade++;
						} else {
							$scope.threesmade++;
							$scope.threepointshots++;
						}
						$scope.shots++;
				};

				var shotMissed = function(value, $event) { // Adds missed shots
						$scope.allshots.push({ // pushes shot into array
							x: $event.offsetX / ($scope.size / 100),
							y: $event.offsetY / ($scope.size / 100),
							color: '#FFB7AA',
							strokeColor: '#FF856F',
							value: value,
							type: 'missed'
						});
						
						if (value === 2) {
						} else {
							$scope.threepointshots++;
						}
						$scope.shots++;
					
				};

				$scope.removeShot = function(basket, $event) { // Deletes shot completely
					if ($scope.removingShots) { // If you are removing shots
						$scope.shots--;
						var basketType = basket.type; // Made or missed
						var basketValue = basket.value; // 2 or 3

						if(basketValue===3) {
							$scope.threepointshots--;
						}
						if (basketType==="made") {
							if(basketValue===3) {
								$scope.threesmade--;
							}
							if(basketValue===2) {
								$scope.twosmade--;
							}
						}
						
						$scope.allshots.forEach(function(b, i) { 
							if (b === basket) {
								$scope.allshots.splice(i , 1);
								return;
							}
							
						});
					} else { // If you are NOT removing shots
						$scope.addCircle(basket.value, $event); // Add a shot
					} 
				};


			},
			compile: function() {

				return function(scope, elem, attr) {
					scope.size = attr.size || 100;
				}
			}
		};
	}
);