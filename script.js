// All of this code is for the schedule
const scheduleTable = document.querySelector("#schedule");
const allTotalIDs = ["adsTotal", "mondayTotal", "tuesdayTotal",
    "wednesdayTotal", "thursdayTotal", "fridayTotal", "saturdayTotal",
    "sundayTotal", "rateTotal", "costTotal"
]
const allColumnClasses = [
    "ads", "monday", "tuesday",
    "wednesday", "thursday", "friday", "saturday",
    "sunday", "rate", "cost"
]
const allRowClasses = ["rowOne", "rowTwo", "rowThree", "rowFour", "rowFive"];
const allRowColumnTotalID = ["rowOneTotal", "rowTwoTotal", "rowTotalThree", "rowTotalFour", "rowTotalFive"];



// This will be for the table. It will automatically listen for any inputs when the client types in a number
scheduleTable.addEventListener("input", () =>
{
    getAllTotals();
})

/*
    This is for the columns. It will add up all of the cells in the column and return the total
*/
function calculateTotalColumn(singleColumn)
{
    // Get all of the cells in a column
    const column = document.querySelectorAll("." + singleColumn);


    let total = 0;

    // For each cell
    for (const x of column)
    {
        // Get the value (or text content for the last row)
        let currentValue = x.value || x.textContent

        // If it contains the "$", replace and trim it.
        currentValue = currentValue.replace("$", "").trim();

        // Parse it.
        const value = parseFloat(currentValue)

        // If it's not NaN, add it
        if (!isNaN(value))
        {
            total += value;
        }
    }

    // Return it
    return total;
}

// This is to calculate each row.
function calculateTotalRow(singleRow)
{
    let total = 0;

    const row = document.querySelectorAll("." + singleRow);

    // Loop through the cells in each row
    for (let i = 0; i < row.length; i++)
    {
        
        // Get the value
        const value = parseFloat(row[i].value)

        // If the row is not empty
        if (!isNaN(value))
        {
            // If it's the rate column, multiply instead of adding.
            if (i == row.length - 1)
            {
                total *= value;
            }
            else
            {
                total += value;
            }
        }
    }

    // Return the total.
    return total;
}

/*
    This is for the columns. It's basically the same thing, but no "$".
*/
function displayTotalColumn(totalCell, amount)
{
    const totalCellId = document.querySelector("#" + totalCell);

    totalCellId.textContent = amount;
}

// This is for the rows only. It adds a "$" to every cost cell in each row.
function displayTotalRow(totalCell, amount)
{
   const totalCellId = document.querySelector("#" + totalCell);

    totalCellId.textContent = "$" + amount;
} 

/*
    This method will be used to generate all of the totals in the "Weekly Totals"
    cells. It include the cells of each row and each column.
 */
function getAllTotals()
{
    // This loop is for the rows.
    for (let i = 0; i < allRowClasses.length; i++)
    {
        // This is for calculating the total row to row.
        const rowAmount = calculateTotalRow(allRowClasses[i])
        displayTotalRow(allRowColumnTotalID[i], rowAmount.toFixed(2))
    }
     

    // This loop is for the columns
    for (let i = 0; i < allTotalIDs.length; i++)
    {
        // This is for calculating the totals column to column
        const amount = calculateTotalColumn(allColumnClasses[i])

        // If it's the last two rows (rate and total), add a "$" to the number
        // else, don't
        if (i > allTotalIDs.length - 3)
        {
            displayTotalColumn(allTotalIDs[i], "$" + amount.toFixed(2))
        }
        else
        {
            displayTotalColumn(allTotalIDs[i], amount)
        }   
    }
}



// Will be worked on later.
// const generateNewSchedule = document.querySelector("#make-new-schedule");
// generateNewSchedule.addEventListener("click", () =>
// {
//     console.log("test");
// })