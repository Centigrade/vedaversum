import React from "react";
import UserName, { UsernameProps } from "../common/UserName";
import image from "../../assets/dummy.png";
import dummyUsersList from "../../assets/dummyUsersList";

function CardListItem(cardData: any) {
  const card = cardData.cardData;

  // format date of creation so it gets readable
  const creationDate = new Date("2022-04-27T13:07:39.496+02:00");
  const options: object = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const createdOn: string = creationDate.toLocaleDateString("en-GB", options);

  // get author data - at the moment the creator is always the first person assigned, later
  // TODO use value of "userCreated" to get user infos from the database
  const author: UsernameProps = {
    name: card.assignedUsers[0].userName,
    profile: card.assignedUsers[0].webProfileUrl,
  };

  // assigned users

  /* let assignedUsers: object[] = [];

  if (card.assignedUsers.length > 1) {
    let i: number = 1;
    while (i < card.assignedUsers.length) {
      assignedUsers.push(card.assignedUsers[i]);
      i++;
    }
  } */
  const mockData = {
    assignedUsers: dummyUsersList.slice(-2),
  };

  // TODO: add edit & delete button if the article is from the user currently logged in
  // TODO: add remove upvote button
  return (
    <div className="border border-primary my-2 p-3">
      <div className="d-flex">
        <div className="w-75">
          <h4>{card.title} <button className="veda-versum-button mx-2">Bookmark</button></h4>
          <p>{createdOn}</p>
          <p>{card.content}</p>
        </div>
        <div className="w-25">
          <img
            className="article-image"
            src={card.assignedUsers[0].avatarUrl || image}
            alt="some pic"
          />
        </div>
      </div>

      {/* assigned users */}
      <div className="d-flex align-items-center mt-3">
        <span>Assignees:</span>
        {mockData.assignedUsers.map((user) => (
          <div className="mt-2" key={user.id}>
            <UserName name={user.userName} profile={user.webProfileUrl} />
          </div>
        ))}
      </div>

      {/* author and upvotes */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex align-items-center">Author: <UserName name={author.name} profile={author.profile} /></div>
        <p>
          123 upvotes
          <button className="veda-versum-button mx-2">Upvote</button>
        </p>
      </div>
    </div>
  );
}

export default CardListItem;
