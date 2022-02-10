import { User } from "../models/users";

type searchLogicProps = {
  search: string;
  data: User[];
};

const searchLogic = ({ search, data }: searchLogicProps) => {
  var searchArray = search.split(" ");

  var uniqSearch: string[] = [];
  var items: User[] = [];

  // Push words in array for manipulate
  for (var i = 0; i < searchArray.length; i++) {
    searchArray[i] = searchArray[i].replace(/^\s*/, "").replace(/\s*$/, "");
    uniqSearch.push(searchArray[i]);
  }

  // Check friend
  data.filter((i: User) => {
    var qty = 0;
    return uniqSearch.map((uni) => {
      var check = i.name.toLowerCase().includes(uni);
      if (check) qty = qty + 1;
      if (uniqSearch.length === qty) {
        items.push(i);
      }
    });
  });

  return items;
};

export default searchLogic;
