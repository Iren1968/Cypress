Feature: User login on secret santa website, creat a box, invite participants and make a draw

  Scenario: userAutor logs in sucessfully
    Given userAutor is on secret santa login page
    When userAutor logs in as "kapadolgova@gmail.com" and "Gibbon45"
    Then userAutor is on dashboard page and see button "creat a box"

  Scenario: userAutor  creat a box successfully
    When userAutor passes the steps of box creating
    

  Scenario: userAutor invites a participant via the link successfully and create a card in the box
    When userAutor generates an invitation link
    Then userAutor created the box successfully

  Scenario: userAutor adds participants in a different way
    Given userAutor is on secret santa login page
    When userAutor logs in as "kapadolgova@gmail.com" and "Gibbon45"
    When userAutor clicks on 'add participants' button
    Then userAutor fills the cells in the table

    Examples: 
      | name   | email                        |
      | Irina2 | kapadolgova+test1@gmail.com  |
      | Irina3 | kapadolgova+test12@gmail.com |

  Scenario: userAutor draws
    When userAutor clicks on 'go to the draw' button
    Then userAutor clicks on 'start a draw' button
    Then userAutor clicks on verification button
    Then userAutor conducted the draw successfully

  Scenario: userAutor recieved notification
    When userAutor clicks notifications button
    Then userAutor sees a notification

  Scenario: other participants recieved notifications
    When users log as "<email>" and "<password>"
    Then users click notifications button
    Then users see a notifications

    Examples: 
      | email                        | password  |
      | kapadolgova+test1@gmail.com  | Gibbon65  |
      | kapadolgova+test12@gmail.com | Gibbon100 |
