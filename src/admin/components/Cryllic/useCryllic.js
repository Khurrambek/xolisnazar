import { useState } from "react";

const useCryllic = () => {
  const [text, setText] = useState("");

  const setTextHandler = (latinText) => {
    const result = latinText.split("");

    result.forEach((sign, index) => {
      if (sign === sign.toLowerCase()) {
        switch (sign) {
          case "a":
            result[index] = "a";
            break;
          case "б":
            result[index] = "b";
            break;
          case "c":
            result[index] = "c";
            break;
          case "д":
            result[index] = "d";
            break;
          case "e":
            result[index] = "e";
            break;
          case "э":
            result[index] = "e";
            break;
          case "ф":
            result[index] = "f";
            break;
          case "г":
            result[index] = "g";
            break;
          case "ҳ":
            result[index] = "h";
            break;
          case "и":
            result[index] = "i";
            break;
          case "ж":
            result[index] = "j";
            break;
          case "к":
            result[index] = "k";
            break;
          case "л":
            result[index] = "l";
            break;
          case "м":
            result[index] = "m";
            break;
          case "н":
            result[index] = "n";
            break;
          case "o":
            result[index] = "о";
            break;
          case "п":
            result[index] = "p";
            break;
          case "қ":
            result[index] = "q";
            break;
          case "р":
            result[index] = "r";
            break;
          case "с":
            result[index] = "s";
            break;
          case "т":
            result[index] = "t";
            break;
          case "у":
            result[index] = "u";
            break;
          case "в":
            result[index] = "v";
            break;
          case "х":
            result[index] = "x";
            break;
          case "й":
            result[index] = "y";
            break;
          case "з":
            result[index] = "z";
            break;
          case "ш":
            result[index] = "sh";
            break;
          case "ё":
            result[index] = "yo";
            break;
          case "ч":
            result[index] = "ch";
            break;
          case "ъ":
            result[index] = "'";
            break;
          case "ю":
            result[index] = "yu";
            break;
          case "я":
            result[index] = "ya";
            break;
          case "ў":
            result[index] = "o'";
            break;
          case "ь":
            result[index] = "";
            break;
          case "ц":
            result[index] = "s";
            break;
          case "ғ":
            result[index] = "g'";
            break;
        }
      } else {
        switch (sign.toLowerCase()) {
          case "a":
            result[index] = "a".toUpperCase();
            break;
          case "б":
            result[index] = "b".toUpperCase();
            break;
          case "c":
            result[index] = "c".toUpperCase();
            break;
          case "д":
            result[index] = "d".toUpperCase();
            break;
          case "e":
            result[index] = "e".toUpperCase();
            break;
          case "э":
            result[index] = "e".toUpperCase();
            break;
          case "ф":
            result[index] = "f".toUpperCase();
            break;
          case "г":
            result[index] = "g".toUpperCase();
            break;
          case "ҳ":
            result[index] = "h".toUpperCase();
            break;
          case "и":
            result[index] = "i".toUpperCase();
            break;
          case "ж":
            result[index] = "j".toUpperCase();
            break;
          case "к":
            result[index] = "k".toUpperCase();
            break;
          case "л":
            result[index] = "l".toUpperCase();
            break;
          case "м":
            result[index] = "m".toUpperCase();
            break;
          case "н":
            result[index] = "n".toUpperCase();
            break;
          case "o":
            result[index] = "о".toUpperCase();
            break;
          case "п":
            result[index] = "p".toUpperCase();
            break;
          case "қ":
            result[index] = "q".toUpperCase();
            break;
          case "р":
            result[index] = "r".toUpperCase();
            break;
          case "с":
            result[index] = "s".toUpperCase();
            break;
          case "т":
            result[index] = "t".toUpperCase();
            break;
          case "у":
            result[index] = "u".toUpperCase();
            break;
          case "в":
            result[index] = "v".toUpperCase();
            break;
          case "х":
            result[index] = "x".toUpperCase();
            break;
          case "й":
            result[index] = "y".toUpperCase();
            break;
          case "з":
            result[index] = "z".toUpperCase();
            break;
          case "ш":
            result[index] = "s".toUpperCase() + "h";
            break;
          case "ё":
            result[index] = "y".toUpperCase() + "o";
            break;
          case "ч":
            result[index] = "c".toUpperCase() + "h";
            break;
          case "ю":
            result[index] = "y".toUpperCase() + "u";
            break;
          case "я":
            result[index] = "y".toUpperCase() + "a";
            break;
          case "ў":
            result[index] = "o'".toUpperCase();
            break;
          case "ц":
            result[index] = "s".toUpperCase();
            break;
          case "ғ":
            result[index] = "g'".toUpperCase();
            break;
        }
      }
    });

    setText(result.join(""));
  };

  return [text, setTextHandler];
};

export default useCryllic;
