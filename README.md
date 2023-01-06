Welcome to the cypress-fundamentals wiki!


**How to run?**
1. Go to the app folder in the terminal.
2. Install packages using **npm install** command.
3. Run the application using **npm start** command.
4. Open a new instance of the terminal and go to the API folder in the terminal.
5. Install packages using **npm install** command.
6. Run the application using **npm start** command.
7. Open a new instance of the terminal and go to the parent folder where package.json contains the cypress package.
8. Install packages using **npm install** command.
9. Run the Cypress Test Runner using the command **npx cypress open**

**How to run Cypress in Headless Mode?**
We can run Cypress in Headless Mode using the command **npx cypress run**

When we run Cypress, it will by default create folders,
1. fixtures - To mock data for the response of APIs
2. integrations - Where Tests are written, i.e {testname}spec.js 
3. plugins - Add a plugin to use
4. support - Write custom commands

To get IntelliSense in VS Code, add the following line in the top of the test file. 
/// <reference types="cypress" />

Cypress commands are categorized as **parent,child and dual commands**.We can also create custom commands.

Parent commands begin with new chain of cypress commands,
Examples : 
1. cy.visit("/demo");
2. cy.get("h1");
3. cy.request("http://dev.local/seed");
4. cy.exec("npm install")
5. cy.intercept("/users/*");

Child commands - Chained off parent command or another child command,
Examples :
1. cy.get("[data-cy=demo]")**.click()**;
2. cy.get("[data-cy=demo]")**.type("demo123")**;
3. cy.get("[data-cy=demo]")**.find("demo123")**;
4. cy.contains("ul","room-number")**.should("be.visible")**;
5. cy.get("footer")**.scrollIntoView()**;
6. cy.get("form")**.submit()**;

Dual Commands - can start chain or be chained off an existing one
Examples : 
1. cy.contains()
2. cy.screenshot()
3. cy.scrollTo()
4. cy.wait() 

Selectors - Cypress will automatically calculate a unique selector to use targeted elements.
 - data-cy,data-test,data-testid
 - id,class,tag,attributes

Refer - [Cypress Selectors Link](https://docs.cypress.io/api/commands/get#Selector)

Note : When we use a selector in Cypress, always use a selector which will not change over time. We can add **data-cy** attribute in HTML element.
Example : <button id="main" class="btn btn-large" name="submission" role="button" data-cy="submit"> Submit </button> 
so Cypress selector would be **cy.get("[data-cy=submit]").click();**

**Common Cypress Assertions**
1. cy.contains("[data-cy=day]","Wednesday").should("be.visible");
2. cy.url().should("include","/sessions");
3. cy.get("[data-cy=regularList]").should("have.length",20);
4. cy.get("[data-cy=profile]").should("not.exist");

[Cypress Assertion Documentation](https://docs.cypress.io/guides/references/assertions)


**Cypress Retry-ability**
Cypress smartly waits for the application to update.
If assertions following a DOM query command fail- Cypress will retry until a timeout is reached.
No hardcoding wait 

Retry-ability Caveats
1. Cypress only retries commands that query the DOM
 - .get(),.find(),.contains() etc

2. Commands that may change the state of the application are not retried.
 - .click() - Not retried by Cypress

Note - Only last command before assertion is retried.
The default timeout of retry is 4000ms.


Cypress Network Testing Strategy
1. Stub Responses
2. Use Server Responses

**Stub Responses**
1. Can control every aspect of response(header/body/status)
2. Extremely fast and reliable responses with no flakiness in tests

**Use Server Responses**  
1. True End to End tests that wait for a response from the server.
2. Great for traditional server-side HTML rendering.
3. Tests will be slower and unreliable(Needs go through all layer of the servers)

Note - Network issues and connection failures are not in the control of the Cypress test.

**Best Practice**
1. Use stubbed response tests more often for speed, simplicity and reliability.
2. Don't use stubbed responses for server-side rendering architecture.
3. Avoid stubs for critical paths like login.


**Cypress Intercept Command**
cy.intercept() -> can statically define 
1. body
2. HTTP status code
3. headers and other responses items

Intercept command helps us spy and stubbing the backend with cy.intercept(), Can stub N/W response with data from fixture.
We can declaratively wait for requests and responses using cy.wait().

Example: 

cy.intercept("/users/**");

cy.intercept("GET","/users/**")

cy.intercept({method:"GET",url:"/usrs/abc",hostname:"localhost"});

Stubbing Response - 
Example : 
cy.intercept("/not-present"),{
**statusCode : 404,**
**body: "404 not found",**
**headers: {**
  **"x-found":"false"**
**}**
}

Stubbing Fixtures : We can stubed network requests and have it respond instantly with fixture data.
Example : 
cy.intercept('GET','/activites/*',**{fixture: 'activities.json'}**)


**Capture Video** - We can capture video of ran tests by Cypress.
To disable video we can add flag **video: false** in **cypress.json** file

 
**Screenshot** - If test is failed Cypress take screenshot and placed under screenshot folder.
We can use cy.screenshot() command to take screenshot at any point of test execution.

**Browsers Support** - We can select browser from Test Runner.
Note : No support for IE and Safari. 



 

































