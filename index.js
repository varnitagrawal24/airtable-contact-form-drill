// Read Record
const readRecords = async () => {
  try {
    const response = await fetch(
      "https://api.airtable.com/v0/appSGeoGS5ZbODDXu/Table%201?maxRecords=10&view=Grid%20view",
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer patWaKCTbdLynKbmX.44ad80d900a61f266485529ad2f7e2b3710544c4a0d4a47e8fa698e885bae99b",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

//delete Record
const deleteRecord = async (userId) => {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/appSGeoGS5ZbODDXu/Table%201/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer patWaKCTbdLynKbmX.44ad80d900a61f266485529ad2f7e2b3710544c4a0d4a47e8fa698e885bae99b",
        },
      }
    );
    const data = await response.json();
    console.log("Deleted UserId: ", data);
  } catch (error) {
    console.error(error);
  }
};

// Update Record

const updateRecord = async (userId, name, phone, email) => {
  try {
    const data = {
      records: [
        {
          id: userId,
          fields: {
            name,
            phone,
            email,
          },
        },
      ],
    };
    await fetch("https://api.airtable.com/v0/appSGeoGS5ZbODDXu/Table%201", {
      method: "PATCH",
      headers: {
        Authorization:
          "Bearer patWaKCTbdLynKbmX.44ad80d900a61f266485529ad2f7e2b3710544c4a0d4a47e8fa698e885bae99b",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};
// create lable
function createCardLable(fieldName, tag) {
  const div = document.createElement("div");
  const label = document.createElement("label");
  label.innerText = fieldName;
  div.appendChild(label);
  div.appendChild(tag);
  return div;
}
// create input
function createInputFields(fieldType, fieldId, fieldValue) {
  const input = document.createElement("input");
  input.type = fieldType;
  input.value = fieldValue;
  input.id = fieldId;
  input.disabled = true;
  return input;
}

// create card

const createCard = (id, name, phone, email, msg) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardDetail = document.createElement("div");
  cardDetail.classList.add("card-details");

  const nameInput = createInputFields("text", "name", name);
  const cardLableForName = createCardLable("Name", nameInput);
  cardDetail.appendChild(cardLableForName);

  const phoneInput = createInputFields("text", "phone", phone);
  const cardLableForPhone = createCardLable("Mobile Number", phoneInput);
  cardDetail.appendChild(cardLableForPhone);

  const emailInput = createInputFields("email", "email", email);
  const cardLableForEmail = createCardLable("Email", emailInput);
  cardDetail.appendChild(cardLableForEmail);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";

  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.innerText = "Edit";

  deleteBtn.addEventListener("click", () => {
    deleteRecord(id);
    card.remove();
  });
  editBtn.addEventListener("click", () => {
    if (editBtn.innerText == "Save") {
      editBtn.classList.remove("save");
      nameInput.disabled = true;
      phoneInput.disabled = true;
      emailInput.disabled = true;
      editBtn.innerText = "Edit";
      updateRecord(id, nameInput.value, phoneInput.value, emailInput.value);
    } else {
      nameInput.disabled = false;
      phoneInput.disabled = false;
      emailInput.disabled = false;
      editBtn.innerText = "Save";
      editBtn.classList.add("save");
    }
  });

  card.appendChild(cardDetail);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);
  return card;
};

const printData = async () => {
  try {
    const data = await readRecords();

    const main = document.querySelector("main");
    main.innerHTML = "";

    data.records.forEach((element) => {
      //   card
      const card = createCard(
        element.id,
        element.fields.name,
        element.fields.phone,
        element.fields.email
      );
      if (card) {
        main.appendChild(card);
      }
    });
  } catch (error) {
    console.error(error);
  }
};

printData();
