import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SearchBox = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    console.log(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <div className="input-group m-5">
        <input
          type="text"
          className="form-control rounded-full py-2 px-14 bg-gray-200 text-lg focus:outline-none focus:ring focus:border-blue-300 shadow-dark"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="basic-addon2"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString() || ''}
        />
      </div>
    </div>
  );
};

export default SearchBox;
