import { useState, useEffect } from "react";
import * as S from "./WikiStyle";
import wikiInitData from "@/db/wiki/wikiInitData.json";
import WikiContent from "@/components/wiki/WikiContent";
import WikiCategoryList from "@/components/wiki/WikiCategoryList";
import WikiTop from "@/components/wiki/WikiTop";
import { Wiki } from "./WikiType";

export default function WikiPage() {
  const [wikiData, setWikiData] = useState<Wiki[]>(wikiInitData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCategoryList, setShowCategoryList] = useState(true);
  const [form, setForm] = useState<Wiki>({
    wikiID: "",
    parentID: "",
    title: "",
    content: "",
    authorID: "",
    createdAt: "",
    updatedAt: "",
  });
  const [displayedWikis, setDisplayedWikis] = useState<Wiki[]>(
    wikiData.filter((wiki) => !wiki.parentID),
  );
  const firstParentWiki = wikiInitData.find((wiki) => !wiki.parentID) || null;
  const [selectedEntry, setSelectedEntry] = useState<Wiki | null>(
    firstParentWiki,
  );

  useEffect(() => {
    setWikiData(wikiInitData);
  }, []);

  function toggleChildWikis(parentWiki: Wiki) {
    const childWikis = wikiData.filter(
      (wiki) => wiki.parentID === parentWiki.wikiID,
    );

    setDisplayedWikis((prev) => {
      const newDisplayedWikis = [...prev];
      const parentIndex = newDisplayedWikis.findIndex(
        (wiki) => wiki.wikiID === parentWiki.wikiID,
      );

      if (
        newDisplayedWikis[parentIndex + 1] &&
        newDisplayedWikis[parentIndex + 1].parentID === parentWiki.wikiID
      ) {
        let childIndex = parentIndex + 1;
        while (
          newDisplayedWikis[childIndex] &&
          newDisplayedWikis[childIndex].parentID === parentWiki.wikiID
        ) {
          childIndex++;
        }
        newDisplayedWikis.splice(parentIndex + 1, childIndex - parentIndex - 1);
      } else {
        newDisplayedWikis.splice(parentIndex + 1, 0, ...childWikis);
      }
      return newDisplayedWikis;
    });
  }

  function handleEntryClick(entry: Wiki) {
    setSelectedEntry(entry);
    setForm(entry);
  }
  function handleWikiButtonClick() {
    setShowCategoryList(!showCategoryList);
  }

  function toggleEditMode() {
    setIsEditMode((prev) => !prev);
  }

  function handleRegisterClick() {
    setIsEditMode(true);
    setShowCategoryList(false);
    setForm({
      wikiID: "",
      parentID: "",
      title: "",
      content: "",
      authorID: "",
      createdAt: "",
      updatedAt: "",
    });
  }

  function handleSaveClick() {
    setIsEditMode(false);
    setShowCategoryList(true);
    alert("위키를 저장했습니다.");
  }

  function handleFormChange(key: keyof typeof form, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <>
      <S.WikiWrapper>
        <WikiTop
          title="WIKI"
          isEditMode={isEditMode}
          onRegister={handleRegisterClick}
          onSave={handleSaveClick}
        ></WikiTop>
        <S.Container>
          <WikiCategoryList
            WiKiList={displayedWikis}
            onEntryClick={handleEntryClick}
            onArrowClick={toggleChildWikis}
            style={{ display: showCategoryList ? "block" : "none" }}
          />
          {
            <WikiContent
              Wiki={selectedEntry}
              isEditMode={isEditMode}
              onWikiButtonClick={handleWikiButtonClick}
              toggleEditMode={toggleEditMode}
              form={form}
              onFormChange={handleFormChange}
            />
          }
        </S.Container>
      </S.WikiWrapper>
    </>
  );
}
