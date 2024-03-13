## Task: Develop a Trello-like dnd dashboard using React, TypeScript, and MobX.

#### Requirements:

1. Create three columns: "To contact", "Contacted", "Committed".
2. Display a card counter in the header of each column showing the number of cards in it. If the column is empty, only display the column name.
3. Add a button in the "To contact" column to create a new card. When clicked, a rectangular card should appear with a text field for entering an email and a delete button in the top right corner. The add button should remain below the new card.
4. Validate the email input. If the email is not entered or is invalid, prevent dragging the card to the next column.
5. When dragging a card to the "Contacted" column, add a text area for entering comments. If the comment is empty, prevent dragging the card to the next column.
6. When dragging a card to the "Committed" column, add a toggle switch with icons "thumbs up/down" and a label displaying the status "Success" or "Fail".
7. When dragging a card from right to left, delete added fields and clear the data in them.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
