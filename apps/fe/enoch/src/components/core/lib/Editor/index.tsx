import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import PostService from "../../../../services/PostService";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

interface EditorProps {
  value: any;
  handleData: any;
  modules?: any;
  className?: string;
  placeholder?: string;
  showtoolbar?: boolean;
}

function Editor({
  value,
  handleData,
  placeholder = "",
  className = "",
  modules,
  ...rest
}: EditorProps) {
  React.useEffect(() => {
    require("quill-mention");
  }, []);

  async function suggestPeople(searchTerm: string) {
    return await PostService.fetchUsersFromMention(searchTerm).then(
      (response) => {
        return response?.map((people: { _id: string; username: string }) => {
          return {
            id: people._id,
            value: people.username,
            denotationChar: "@",
            link: `/profile/${people._id}`,
          };
        });
      }
    );
  }

  return (
    <ReactQuill
      value={value}
      className={className}
      onChange={(value) => handleData(value)}
      {...rest}
      modules={{
        mention: {
          allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
          mentionDenotationChars: ["@", "#"],
          source: useCallback(async (searchTerm: string, renderList: any) => {
            const matchedPeople = await suggestPeople(searchTerm);
            renderList(matchedPeople);
          }, []),
        },
        ...modules,
      }}
      placeholder={placeholder}
    />
  );
}

export default Editor;
