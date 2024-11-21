let notes = [];  // In-memory notes storage. You can replace this with a database.

exports.handler = async function(event, context) {
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify(notes)
    };
  }

  if (event.httpMethod === "POST") {
    const newNote = JSON.parse(event.body);
    notes.push(newNote);  // Store the new note (in memory for this demo).
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note added successfully" })
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method not allowed" })
  };
};
