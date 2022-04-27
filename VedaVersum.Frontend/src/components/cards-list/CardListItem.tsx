import React from "react";
import UserName, { UsernameProps } from "../common/UserName";

function CardListItem(cardData: any) {
  const card = cardData.cardData;

  const creationDate = new Date("2022-04-27T13:07:39.496+02:00");
  const options: object = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const createdOn: string = creationDate.toLocaleDateString("de-DE", options);

  // at the moment the creator is always assigned, so this works always
  const author: UsernameProps = {
    name: card.assignedUsers[0].userName,
    profile: card.assignedUsers[0].webProfileUrl,
  };

  console.log(author);

  let assignedUsers: object[] = [];

  if (card.assignedUsers.length > 1) {
    let i: number = 1;
    while (i < card.assignedUsers.length) {
      assignedUsers.push(card.assignedUsers[i]);
      i++;
    }
  }

  /** <div className="mt-5">
        <p> Assigned user(s): {assignedUsers} </p>
      </div> */

  return (
    <div className="border border-primary my-2 p-3 w-75">
      <div className="d-flex">
        <div className="w-75">
          <h4>{card.title}</h4>
          <p>{createdOn}</p>
          <p>{card.content}</p>
        </div>
        <div className="w-25">
          <img src="../../assets/dummy.png" alt="some pic" />
        </div>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <UserName name={author.name} profile={author.profile} />
        <p>123 upvotes</p>
      </div>
    </div>
  );
}

export default CardListItem;
