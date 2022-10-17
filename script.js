// All Category News

const allCategoryItems = async () => {
  const url = ` https://openapi.programming-hero.com/api/news/categories`;
  const response = await fetch(url);
  const data = await response.json();
  const allData = data.data.news_category;
  return allData;
};

// Get All News With Id

const getAllNews = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = data.data;
    const allNewsItem = document.getElementById("all-news-item");
    dataArray.map((item) => {
      const { thumbnail_url, details, title, author, total_view, _id } = item;
      const figure = document.createElement("figure");
      figure.classList.add(
        "flex",
        "bg-neutral-50",
        "rounded-xl",
        "p-8",
        "md:p-0",
        "mt-6"
      );
      figure.innerHTML = `
      <img class="md:w-48 md:h-auto m-3" src="${thumbnail_url}" alt="" />
      <div class="pt-6 ml-5 text-center space-y-4 md:p-2 md:text-left">
        <blockquote >
          <h3 class="text-lg font-medium text-slate-900">${title}</h3>
          <p class="font-medium text-gray-400 mb-20">
            ${
              details.length > 300
                ? details.slice(0, 300).concat("...")
                : details
            }
          </p>
        </blockquote>
        <figcaption class="font-medium flex items-center justify-between">
          <div class="flex items-center ">
            <img class="h-10 w-10 rounded-full" src="${
              author.img
            }" alt="" srcset="" />
            <div class="ml-2">
              <div class="text-sky-500">${
                author.name ? author.name : "Author Not Found"
              }</div>
              <div class="text-slate-700">${
                author.published_date
                  ? author.published_date
                  : "No Date And Time Found"
              }</div>
            </div>
          </div>
          
          <div>Total Views : ${total_view ? total_view : "Not Found"}</div>
          <div class="text-red-500 text-6xl">
            <a onClick="getDetails('${_id}')" href="#">
              <label for="my-modal" class="cursor-pointer">&#8594;</label>            
            </a>
          </div>
        </figcaption>
      </div>
    `;
      allNewsItem.appendChild(figure);
    });
  } catch (error) {
    console.log(error);
  }
};

getAllNews();

// Sort News
document.getElementById("high-views").addEventListener("click", async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/08`;
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = data.data;
    const allNewsItem = document.getElementById("all-news-item");
    allNewsItem.textContent = "";
    const sortArrayByViews = dataArray.sort((a, b) => {
      return b.total_view - a.total_view;
    });
    sortArrayByViews.map((item) => {
      console.log(item);
      const { thumbnail_url, details, title, author, total_view, _id } = item;
      const figure = document.createElement("figure");
      figure.classList.add(
        "flex",
        "bg-neutral-50",
        "rounded-xl",
        "p-8",
        "md:p-0",
        "mt-6"
      );
      figure.innerHTML = `
      <img class="md:w-48 md:h-auto m-3" src="${thumbnail_url}" alt="" />
      <div class="pt-6 ml-5 text-center space-y-4 md:p-2 md:text-left">
        <blockquote >
          <h3 class="text-lg font-medium text-slate-900">${title}</h3>
          <p class="font-medium text-gray-400 mb-20">
            ${
              details.length > 300
                ? details.slice(0, 300).concat("...")
                : details
            }
          </p>
        </blockquote>
        <figcaption class="font-medium flex items-center justify-between">
          <div class="flex items-center ">
            <img class="h-10 w-10 rounded-full" src="${
              author.img
            }" alt="" srcset="" />
            <div class="ml-2">
              <div class="text-sky-500">${
                author.name ? author.name : "Author Not Found"
              }</div>
              <div class="text-slate-700">${
                author.published_date
                  ? author.published_date
                  : "No Date And Time Found"
              }</div>
            </div>
          </div>
          
          <div>Total Views : ${total_view ? total_view : "Not Found"}</div>
          <div class="text-red-500 text-6xl">
            <a onClick="getDetails('${_id}')" href="#">
              <label for="my-modal" class="cursor-pointer">&#8594;</label>            
            </a>
          </div>
        </figcaption>
      </div>
    `;
      allNewsItem.appendChild(figure);
    });
  } catch (error) {
    console.log(error);
  }
});

// Display In Menu All Category News

const displayMenu = async () => {
  try {
    const allCategory = await allCategoryItems();
    const displayItems = document.getElementById("menu-items");

    allCategory.map((item) => {
      const menuLi = document.createElement("li");
      const { category_id, category_name } = item;
      menuLi.classList.add("px-5", "py-3", "text-xl", "text-slate-800");
      menuLi.innerHTML = `
      <a id=${category_id} onClick="displayNews(${category_id} , '${category_name}')" href="#">${category_name}</a>
    `;
      displayItems.appendChild(menuLi);
    });
  } catch (error) {
    console.log(error);
  }
};

displayMenu();

const displayNews = async (categoryId, categoryName) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    const response = await fetch(url);
    const data = await response.json();
    const totalNews = document.getElementById("total-news");
    const newsCategory = document.getElementById("news-category");
    const allNewsItem = document.getElementById("all-news-item");
    allNewsItem.textContent = "";
    const newsArray = data.data;

    const sortArrayByViews = newsArray.sort((a, b) => {
      return b.total_view - a.total_view;
    });
    totalNews.innerText = data.data.length;
    newsCategory.innerText = categoryName;
    loader(true);
    sortArrayByViews.map((item) => {
      const { thumbnail_url, details, title, author, total_view, _id } = item;
      const figure = document.createElement("figure");
      figure.classList.add(
        "flex",
        "bg-neutral-50",
        "rounded-xl",
        "p-8",
        "md:p-0",
        "mt-6"
      );
      figure.innerHTML = `
      <img class="md:w-48 md:h-auto m-3" src="${thumbnail_url}" alt="" />
      <div class="pt-6 ml-5 text-center space-y-4 md:p-2 md:text-left">
        <blockquote >
          <h3 class="text-lg font-medium text-slate-900">${title}</h3>
          <p class="font-medium text-gray-400 mb-20">
            ${
              details.length > 300
                ? details.slice(0, 300).concat("...")
                : details
            }
          </p>
        </blockquote>
        <figcaption class="font-medium flex items-center justify-between">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full" src="${
              author.img
            }" alt="" srcset="" />
            <div class="ml-2">
              <div class="text-sky-500">${
                author.name ? author.name : "Author Not Found"
              }</div>
              <div class="text-slate-700">${
                author.published_date
                  ? author.published_date
                  : "No Date And Time Found"
              }</div>
            </div>
          </div>
          
          <div>Total Views : ${total_view ? total_view : "Not Found"}</div>
          <div class="text-red-500 text-6xl">
            <a onClick="getDetails('${_id}')" href="#">
              <label for="my-modal" class="cursor-pointer">&#8594;</label>            
            </a>
          </div>
          
        </figcaption>
      </div>
    `;
      loader(false);
      allNewsItem.appendChild(figure);
    });
  } catch (error) {
    console.log(error);
  }
};

const getDetails = async (id) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = data.data;
    const detailNews = document.getElementById("detail-news");
    detailNews.textContent = "";
    dataArray.forEach((item) => {
      const { title, details, total_view, thumbnail_url } = item;
      const modalDiv = document.createElement("div");
      modalDiv.classList.add("modal-box");
      modalDiv.innerHTML = `
    <img class="w-full h-auto" src="${thumbnail_url}" alt="" />
    <h3 class="font-bold text-lg">${title}</h3>
    <p class="py-4">
      ${details}
    </p>
    <h4>Total Views : ${total_view ? total_view : "Not Found"}</h4>
    <div class="modal-action">
      <label for="my-modal" class="btn">
        close
      </label>
    </div>
  `;
      detailNews.appendChild(modalDiv);
    });
  } catch (error) {
    console.log(error);
  }
};

const loader = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};
