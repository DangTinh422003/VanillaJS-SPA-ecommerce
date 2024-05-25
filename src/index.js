import router from "./routes";
import AddCart from "./utils/addcart";
import CounterCarItem from "./utils/countercartitem";
import EmptyCart from "./utils/emptycart";
import ModalAddMinus from "./utils/modalAddMinus";
import ModalClose from "./utils/modalClose";
import ModalLikes from "./utils/modalLikes";
import ModalOpen from "./utils/modalOpen";
import ModalPhotos from "./utils/modalPhotos";
import RemoveItem from "./utils/removeitem";
import Search from "./utils/search";

let cartTotals = {
  counter: 0,
  total: 0,
};
let cartContent = [
  // {
  //   id: 0,
  //   image: url,
  //   name: 0,
  //   brand: 0,
  //   price: 0,
  //   counter: 0,
  //   total: 0,
  // photo1:
  // },
];

sessionStorage.setItem("cartTotals", JSON.stringify(cartTotals));
sessionStorage.setItem("cartContent", JSON.stringify(cartContent));

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 27) {
    ModalClose();
  }
});

window.addEventListener("click", (element) => {
  const name = element.target.name;
  const id = element.target.id;
  const name2 = name ? name.slice(0, 4) : "";
  const nameadd = name ? name.slice(0, 3) : "";
  const idadd = id ? id.slice(0, 3) : "";

  if (nameadd === "add" || idadd === "add") {
    const iditem = name ? name.slice(3, 4) : id.slice(3, 4);
    AddCart(iditem);
  } else if (id === "modalContainer") {
    ModalClose();
  } else if (name2 === "info") {
    const item = name ? name.slice(4, 5) : "";
    ModalOpen(item);
  } else if (name === "emptyCart") {
    EmptyCart();
  } else if (name === "removeone") {
    const id = element.target.id;
    if (id) {
      RemoveItem(id);
    }
  } else if (name2 === "like") {
    ModalLikes(name);
  } else if (name2 === "pics") {
    ModalPhotos(name);
  } else if (name2 === "bAdd") {
    ModalAddMinus(name);
  }
});

window.addEventListener("change", (element) => {
  const name = element.target.name;
  console.log(name);
  const value = 1 * element.target.value;
  if (name === "searcher") {
    Search(element.target.value);
  } else if (name == "cartcount") {
    if (value < 0) {
      const id = element.target.id;
      CounterCarItem(id, 0);
    } else {
      const id = element.target.id;
      CounterCarItem(id, value);
    }
  }
});
