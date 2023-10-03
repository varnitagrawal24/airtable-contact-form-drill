const nameForm = document.querySelector("#name");
const phoneForm = document.querySelector("#phone");
const emailForm = document.querySelector("#email");

const submitForm = document.querySelector("#submit");

const createRecord = async () => {
  try {
    const data = {
      records: [
        {
          fields: {
            name: nameForm.value,
            phone: phoneForm.value,
            email: emailForm.value,
          },
        },
      ],
    };
    await fetch("https://api.airtable.com/v0/appSGeoGS5ZbODDXu/Table%201", {
      method: "POST",
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

submitForm.addEventListener("click", async (e) => {
  try {
    e.preventDefault();
    if (nameForm.value.length == 0) {
      alert("Name field is required");
    } else if (!/^\d+$/.test(phoneForm.value) || phoneForm.value.length != 10) {
      alert("Mobile Number only contain 10 digit number");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForm.value)
    ) {
      alert("Correct email should required");
    } else {
      await createRecord();
      window.location.href = "/";
    }
  } catch (error) {
    console.error(error);
  }
});
