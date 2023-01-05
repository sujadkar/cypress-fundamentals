/// <reference types="cypress" />


const thursdaySessionData = {
    "data": {
      "intro": [
        {
          "id": "79874",
          "title": "A.I. powered robots",
          "startsAt": "8:00",
          "day": "Thursday",
          "room": "Jupiter",
          "level": "Introductory and overview",
          "speakers": [
            {
              "id": "36a25c2a-4204-42f0-9ba8-d7b9c6f67226",
              "name": "Bowie Graves",
              "__typename": "Speaker"
            }
          ],
          "__typename": "Session"
        }
      ],
      "intermediate": [
        {
          "id": "84473",
          "title": "Secure Programming for the Enterprise",
          "startsAt": "8:00",
          "day": "Thursday",
          "room": "Europa",
          "level": "Intermediate",
          "speakers": [
            {
              "id": "2bda8276-b7b6-4653-a7c5-1bcc59d11a49",
              "name": "Jean Ryan",
              "__typename": "Speaker"
            }
          ],
          "__typename": "Session"
        }
      ],
      "advanced": [
        {
          "id": "84375",
          "title": "Automation: A Deep Dive into Jenkins",
          "startsAt": "8:00",
          "day": "Thursday",
          "room": "Saturn",
          "level": "Advanced",
          "speakers": [
            {
              "id": "8f3683fe-0760-487b-8a9d-9fbebfaf6bc7",
              "name": "Brandy Terry",
              "__typename": "Speaker"
            }
          ],
          "__typename": "Session"
        }    ]
    }
  };

describe("Sessions page",() => {

    // Run before each test in this describe block
    beforeEach(() => {
        cy.clickViewSessions();

        cy.url().should("include","/sessions");
        
        cy.dataCy("AllSessions").as("AllSessionsBtn");
        cy.dataCy("Wednesday").as("WednesdayBtn");
        cy.dataCy("Thursday").as("ThursdayBtn");
        cy.dataCy("Friday").as("FridayBtn");
    
    });

    it("should navigate to conference sessions page and view day filter buttons",() => {
        cy.visit("http://localhost:1337/conference");
        cy.get("h1").contains("View Sessions").click();

        cy.url().should("include","/sessions");

        //Validate that buttons to filter by day exists.
        cy.get("@AllSessionsBtn");
        cy.get("@WednesdayBtn");
        cy.get("@ThursdayBtn");
        cy.get("@FridayBtn");
    });


    it("should filter sessions and only display Wednesday sessions when Wednesday button is clicked", () => {
        //Stubbing a response data
        // cy.intercept(
        //     "POST",
        //     "http://localhost:4000/graphql",
        //     wednesdaySessionData
        // ).as("getSessionInfo");
        cy.get("@WednesdayBtn").click();
        //cy.wait("@getSessionInfo");

        //Assertions
        //cy.dataCy("day").should("have.length",3);
        cy.dataCy("day").contains("Wednesday").should("be.visible");
        cy.dataCy("day").contains("Thursday").should("not.exist");
        cy.dataCy("day").contains("Friday").should("not.exist");
    });

    it("should filter sessions and only display Thursday sessions when Thursday button is clicked", () => {
        //Stubbing a response data
        cy.intercept("POST","http://localhost:4000/graphql",thursdaySessionData).as("getSessionInfo");
        cy.get("@ThursdayBtn").click();
        cy.wait("@getSessionInfo");

        //Assertions
        cy.dataCy("day").should("have.length",3);
        cy.dataCy("day").contains("Wednesday").should("not.exist");
        cy.dataCy("day").contains("Thursday").should("be.visible");
        cy.dataCy("day").contains("Friday").should("not.exist");
    });


    it("should filter sessions and only display Friday sessions when Friday button is clicked", () => {
        //Stub response data from fixture
        cy.intercept("POST","http://localhost:4000/graphql",{fixture: "sessions.json"}).as("getSessionInfo");
        cy.get("@FridayBtn").click();
        cy.wait("@getSessionInfo");
        //Assertions
        cy.dataCy("day").should("have.length",3);
        cy.dataCy("day").contains("Wednesday").should("not.exist");
        cy.dataCy("day").contains("Thursday").should("not.exist");
        cy.dataCy("day").contains("Friday").should("be.visible");
    });

    it("should filter sessions and only display all sessions sessions when all sessions button is clicked", () => {
        cy.intercept("POST","http://localhost:4000/graphql").as("getSessionInfo");
        cy.get("@AllSessionsBtn").click();
        cy.wait("@getSessionInfo");

        //Assertions
        cy.dataCy("day").contains("Wednesday").should("be.visible");
        cy.dataCy("day").contains("Thursday").should("be.visible");
        cy.dataCy("day").contains("Friday").should("be.visible");
    });
});