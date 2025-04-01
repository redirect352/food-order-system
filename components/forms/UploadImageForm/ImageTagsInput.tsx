import { TagsInput, TagsInputProps } from "@mantine/core";
import { useState } from "react";
import { useSearchImageTagsQuery } from "@/lib/api/moderatorApi";
import { useDebounce } from "@/shared/hooks";

interface ImageTagsInputProps extends TagsInputProps {
  
}

const ImageTagsInput = (props: ImageTagsInputProps) => {
  const [searchString, setSearchValue] = useState('');
  const debouncedSearchString = useDebounce(searchString, 300);
  const {data} = useSearchImageTagsQuery({ searchString : debouncedSearchString});
  return (
    <TagsInput
      searchValue={searchString}
      onSearchChange={setSearchValue}
      data={data?.map(({tagName}) => tagName ) ?? []}
      {...props}
    />
  );
};

export default ImageTagsInput;