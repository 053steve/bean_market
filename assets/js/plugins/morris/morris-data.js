

$(function() {
    
    
    // Donut Chart Income
    Morris.Donut({
        element: 'morris-donut-chart-income',
        data: [{
            label: "Food",
            value: 3420
        }, {
            label: "Baverage",
            value: 1950
        }, {
            label: "Other",
            value: 519
        }],
        resize: true
    });


    // Donut Chart Expense
    Morris.Donut({
        element: 'morris-donut-chart-expense',
        colors: ['#ff3300', '#ff3333', '#ff6666'],
        data: [{
            label: "Cost of Good Sold",
            value: 1295
        }, {
            label: "Operation expense",
            value: 1320
        }, {
            label: "Other expense",
            value: 467
        }],
        resize: true
    });

    

});
