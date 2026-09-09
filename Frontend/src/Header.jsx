import {Link} from 'react-router-dom'
const Header = ({searchValue,setSearchValue,category,setcategory }) => {
  console.log(searchValue) 
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    console.log("Searching for:", searchValue);
  };

  return (
    <header className="w-full bg-white border-b shadow-sm sticky top-0 z-50">
      {/* ================= TOP HEADER ================= */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="min-h-20 flex items-center justify-between gap-4">

            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
               <Link to='/'>EC MART</Link>
              </h1>

              <p className="hidden sm:block text-xs text-blue-100">
                Everything you need
              </p>
            </div>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-2xl mx-4"
            >
              <div className="relative w-full">

                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="
                    w-full h-11 pl-4 pr-14
                    rounded-lg bg-white text-gray-900
                    placeholder-gray-400 border border-transparent
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                  "
                />

              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-5 ">

              {/* Account */}
              <Link to='/account'>
              <button
                className="
                  hidden sm:flex flex-col items-center
                  hover:text-blue-100 transition-colors duration-200 cursor-pointer
                "
              >
                <span className="text-xl">👤</span>
                <span className="text-xs mt-0.5">
                  Account
                </span>
              </button>
              </Link>

              {/* Wishlist */}
              <Link to='wish-list'>
              <button
                className="
                  hidden sm:flex flex-col items-center
                  hover:text-blue-100 transition-colors duration-200 cursor-pointer"
              >
                <span className="text-xl">♡</span>
                <span className="text-xs mt-0.5">
                  Wishlist
                </span>
              </button>
              </Link>   

              {/* Cart */}
              <Link to='/cart'>
              <button
                className="
                  relative flex flex-col items-center
                  hover:text-blue-100 transition-colors duration-200
                  cursor-pointer"
              >
                <span className="text-xl">🛒</span>

                <span
                  className="
                    absolute -top-2 -right-2 w-5 h-5
                    flex items-center justify-center
                    rounded-full bg-red-500
                    text-white text-[10px] font-bold
                  "
                >
                  0
                </span>

                <span className="text-xs mt-0.5">
                  Cart
                </span>
              </button>
              </Link>

            </div>
          </div>

          {/* ================= MOBILE SEARCH ================= */}
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-4"
          >
            <div className="relative w-full">

              <input
                type="text"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="
                  w-full h-11 px-4 pr-12
                  rounded-lg bg-white text-gray-900
                  placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-300
                "
              />

              <button
                type="submit"
                className="
                  absolute right-1 top-1 h-9 w-10
                  rounded-md bg-blue-600 text-white
                  hover:bg-blue-700
                  transition-colors
                "
              >
                🔍
              </button>

            </div>
          </form>

        </div>
      </div>

      {/* ================= CATEGORY NAVIGATION ================= */}
      <nav className="hidden md:block bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="h-12 flex items-center gap-8">

      <Link
        to="/"
        className="
          font-semibold text-gray-700
          hover:text-blue-600 transition-colors
        "
      >
        All Categories
      </Link>

      <Link
        to="/products/category/electronics"
        className="
          text-gray-600
          hover:text-blue-600 transition-colors
        "
      >
        Electronics
      </Link>

      <Link
        to="/products/category/fashion"
        className="
          text-gray-600
          hover:text-blue-600 transition-colors
        "
      >
        Fashion
      </Link>

      <Link
        to="/products/category/home-kitchen"
        className="
          text-gray-600
          hover:text-blue-600 transition-colors
        "
      >
        Home & Kitchen
      </Link>

      <Link
        to="/products/category/smartphones"
        className="
          text-gray-600
          hover:text-blue-600 transition-colors
        "
      >
        Smartphones
      </Link>

      <Link
        to="/products/category/laptops"
        className="
          text-gray-600
          hover:text-blue-600 transition-colors
        "
      >
        Laptops
      </Link>

      <Link
        to="/products/category/deals"
        className="
          text-gray-600
          hover:text-blue-600 transition-colors
        "
      >
        Deals
      </Link>

    </div>
  </div>
</nav>

    </header>
  );
};

export default Header;
