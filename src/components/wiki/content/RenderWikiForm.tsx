import * as Styled from "./WikiContentStyle";
import * as FormStyled from "./RenderWikiFormStyle";
import { WikiFormProps } from "@/components/wiki/types/WikiCommonType";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { MarkdownEditor } from "../markdown/MarkdownEditor";

export default function WikiForm({
  form,
  onFormChange,
  editorRef,
  parents,
  hasChildMap,
}: WikiFormProps) {
  const handleParentChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newParentID = e.target.value;
    const isNewWiki = () => form.wikiID === "";

    const hasChild = hasChildMap[form.wikiID];

    // 현재 위키가 자식을 가지고 있지 않고, 선택한 parentID가 현재 위키의 자식 위키가 아니면 변경 허용
    if (isNewWiki() || (!hasChild && newParentID !== form.wikiID)) {
      onFormChange("parentID", newParentID);
    } else {
      alert(
        "선택한 위키로 이동할 수 없습니다.\n하위 위키를 먼저 이동시킨 후 이동시켜 주세요.",
      );
    }
  };

  return (
    <>
      <Styled.ContentsTitle>
        <FormStyled.FormTitle>
          <FormStyled.Select
            value={form.parentID}
            onChange={handleParentChange}
          >
            <option value="">전체</option>
            {parents.map((parent) => (
              <option key={parent.wikiID} value={parent.wikiID}>
                {parent.title}
              </option>
            ))}
          </FormStyled.Select>
          <FormStyled.Input
            type="text"
            value={form.title}
            onChange={(e) => onFormChange("title", e.target.value)}
            placeholder="제목 입력"
          />
        </FormStyled.FormTitle>
      </Styled.ContentsTitle>

      <MarkdownEditor form={form} editorRef={editorRef}></MarkdownEditor>
    </>
  );
}
