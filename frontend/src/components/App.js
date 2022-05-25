import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import NavPopup from "./NavPopup";
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import InfoTooltip from "./InfoTooltip";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as Auth from "../utils/Auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  // стэйт интерактивности попапов
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  // поведение попапа отображения результатов регистрации
  const [isSuccessMessageTog, setIsSuccessMessageTog] = useState();
  // стэйт для попапа простотра изображений
  const [selectedCardView, setSelectedCardView] = useState(null);
  // стэйт для удаления карточек
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);
  // стэйт основных данных
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  function getToken() {
    return localStorage.getItem("jwt");
  }

  // первичная проверка токена пользователя

  useEffect(() => {
    tokenCheck();
  }, []);

  // загрузка профеля пользователя и карточек

  function tokenCheck() {
    const jwt = getToken();
    if (jwt) {
      Promise.all([api.getUserInfo(jwt), api.getCards(jwt)])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
          setLoggedIn(true);
          history.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  //функция закрытия всех попапов

  function closeAllPopups() {
    setIsNavPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCardView(null);
    setSelectedCardDelete(null);
  }

  // функционал попапа отображения результатов регистрации

  function handleInfoTooltipOpen() {
    setIsInfoTooltip(true);
  }

  // функционал логина

  function handleLogin(email, password) {
    Auth.login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        tokenCheck();
      })
      .catch((err) => {
        setIsSuccessMessageTog(false);
        handleInfoTooltipOpen();
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    history.push("/sign-in");
    setLoggedIn(false);
  }

  // функционал регистрации

  function handleRegister(email, password) {
    Auth.register(email, password)
      .then(() => {
        history.push("/sign-in");
        setIsSuccessMessageTog(true);
        handleInfoTooltipOpen();
      })
      .catch((err) => {
        setIsSuccessMessageTog(false);
        handleInfoTooltipOpen();
        console.log(err.error);
      });
  }

  // функционал попапа с навигационным меню

  function handleNavPopupOpen() {
    setIsNavPopupOpen(true);
  }

  // функционал попапа подтверждения удаления карточки

  function handleConfirmDeleteClick(card) {
    setSelectedCardDelete(card);
    setIsConfirmDeletePopupOpen(true);
  }

  // функционал попапа просмотра изображения

  function handleCardClick(card) {
    setSelectedCardView(card);
  }

  // функционал попапа редактирования аватара

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateAvatar(link) {
    api
      .changeAvatar(link, getToken())
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка редактирования изображения профиля: ${err}`);
      });
  }

  // функционал попапа редактирования профиля

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleUpdateUser(name, description) {
    api
      .editInfo(name, description, getToken())
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка изменения данных пользователя: ${err}`);
      });
  }

  // функционал попапа добавления карточек

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleAddPlaceSubmit(place, url) {
    api
      .uploadCard(place, url, getToken())
      .then((card) => {
        setCards([...cards, card]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка создания карточки: ${err}`);
      });
  }

  // функционал поведения карточек

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, getToken())
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки: ${err}`);
      });
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, !isLiked, getToken())
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка добавления или удаления лайка: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <NavPopup
          isOpen={isNavPopupOpen}
          onClose={closeAllPopups}
          handleLogout={handleLogout}
        />

        <Header
          isOpen={handleNavPopupOpen}
          onClose={closeAllPopups}
          isNavPopupOpen={isNavPopupOpen}
          handleLogout={handleLogout}
        />

        <Switch>
          <Route path="/sign-up">
            <Register
              handleRegister={handleRegister}
              handleInfoTooltipOpen={handleInfoTooltipOpen}
            />
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path="/">
            <ProtectedRoute
              path="/main"
              component={Main}
              loggedIn={loggedIn}
              cards={cards}
              onCardsLike={handleCardLike}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onConfirmDelete={handleConfirmDeleteClick}
            />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ConfirmDeletePopup
          card={selectedCardDelete}
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirmSubmit={handleCardDelete}
        />

        <ImagePopup card={selectedCardView} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltip}
          isSuccessMessageTog={isSuccessMessageTog}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
