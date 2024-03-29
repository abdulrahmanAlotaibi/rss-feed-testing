/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(
  (function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe("RSS Feeds", function() {
      /* This is our first test - it tests to make sure that the
       * allFeeds variable has been defined and that it is not
       * empty. Experiment with this before you get started on
       * the rest of this project. What happens when you change
       * allFeeds in app.js to be an empty array and refresh the
       * page?
       */
      it("are defined", function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
      });

      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a URL defined
       * and that the URL is not empty.
       */
      it("URL defined , and the URL is not empty", function() {
        allFeeds.forEach(feed => {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        });
      });
      /* TODO: Write a test that loops through each feed
       * in the allFeeds object and ensures it has a name defined
       * and that the name is not empty.
       *
       */

      it("feed name is defined, and it is not empty", function() {
        allFeeds.forEach(feed => {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        });
      });
    });

    /* TODO: Write a new test suite named "The menu" */

    describe("The menu", function() {
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
      try {
        var body = document.querySelector("body");

        it("menu is hidden by default", function() {
          expect(body.classList[0]).toBe("menu-hidden");
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        var menuIcon;
        beforeEach(() => {
          menuIcon = document.querySelector(".menu-icon-link");
        });
        it("display menu when menu icon is clicked", () => {
          menuIcon.click();

          body = document.querySelector("body");
          var oldClass = body.classList[0];

          menuIcon.click();

          // expectation 1: does the menu display when menu icon is clicked
          expect(oldClass).not.toBeDefined();

          body = document.querySelector("body");
          var newClass = body.classList[0];

          // expectation 2: does the menu hide when menu icon clicked again.
          expect(newClass).toBe("menu-hidden");
        });
      } catch (e) {
        console.error(e);
      }
    });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe("Initial Entries", () => {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
      try {
        beforeEach(done => {
          loadFeed(0, ()=>done());
        });

        it("feed load completed", done => {
          const feeds = document.querySelectorAll(".entry-link");
          expect(feeds.length).not.toBe(0);
          done();
        });
      } catch (e) {
        console.error(e);
      }
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", () => {
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
      try {
        var oldFeed;
        beforeEach(done => {
          loadFeed(2, () => {
            oldFeed = document.querySelectorAll(".entry-link");

            loadFeed(1, () => {
              done();
            });
          });
        });

        it("feed changed after loading", done => {
          const newFeed = document.querySelectorAll(".entry-link");
          expect(oldFeed[0].href === newFeed[0].href).toBe(false);
          done();
        });
      } catch (e) {
        console.error(e);
      }
    });
  })()
);
