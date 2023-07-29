import React,{} from "react";
import { useCheckout } from "../../Context/useCheckout";

function PostcodeSelect() {
  const check = useCheckout()
  const handleChangePostcode = (event) => {
    check.setSelectedPostcode(event.target.value);
  };
  return (
    <>
      <label className="label-del" htmlFor="postcode">*Postcode:</label>
      <input
      className="input-del"
        type="text"
        id="postcode"
        name="postcode"
        value={check.selectedPostcode}
        onChange={handleChangePostcode}
        required
      />

    </>
  );
}

export default PostcodeSelect;