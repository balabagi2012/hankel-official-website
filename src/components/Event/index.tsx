"use client";
import { EventEntity } from "@/app/api/event/route";
import Image from "next/image";
import { PrimeReactProvider, locale, addLocale } from "primereact/api";
import { Calendar } from "primereact/calendar";
import { useEffect, useState } from "react";
import Typography from "../Typography";

export interface EventProps {
  category: string;
  lang: "en" | "zh";
}
export default function Event(props: EventProps) {
  const { category, lang } = props;
  const [date, setDate] = useState<Date>();
  const [eventList, setEventList] = useState<EventEntity[]>([]);

  useEffect(() => {
    setDate(new Date());
    addLocale("zh", {
      startsWith: "以...開始",
      contains: "包含",
      notContains: "不包含",
      endsWith: "以...結束",
      equals: "等於",
      notEquals: "不等於",
      noFilter: "不篩選",
      filter: "篩選",
      lt: "小於",
      lte: "小於或等於",
      gt: "大於",
      gte: "大於或等於",
      dateIs: "日期為",
      dateIsNot: "日期不為",
      dateBefore: "日期早於",
      dateAfter: "日期晚於",
      custom: "自訂義",
      clear: "清除",
      apply: "應用",
      matchAll: "全部匹配",
      matchAny: "任意匹配",
      addRule: "增加規則",
      removeRule: "移除規則",
      accept: "是",
      reject: "否",
      choose: "選擇",
      upload: "上傳",
      cancel: "取消",
      completed: "已完成",
      pending: "待定",
      fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      dayNames: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ],
      monthNamesShort: [
        "1 月",
        "2 月",
        "3 月",
        "4 月",
        "5 月",
        "6 月",
        "7 月",
        "8 月",
        "9 月",
        "10 月",
        "11 月",
        "12 月",
      ],
      chooseYear: "選擇年份",
      chooseMonth: "選擇月份",
      chooseDate: "選擇日期",
      prevDecade: "上一個十年",
      nextDecade: "下一個十年",
      prevYear: "上一年",
      nextYear: "下一年",
      prevMonth: "上一個月",
      nextMonth: "下一個月",
      prevHour: "上一個小時",
      nextHour: "下一個小時",
      prevMinute: "上一分鐘",
      nextMinute: "下一分鐘",
      prevSecond: "上一秒",
      nextSecond: "下一秒",
      am: "上午",
      pm: "下午",
      today: "今日",
      now: "現在",
      weekHeader: "周",
      firstDayOfWeek: 0,
      dateFormat: "yy/mm/dd",
      weak: "弱",
      medium: "中",
      strong: "強",
      passwordPrompt: "輸入一組密碼",
      emptyFilterMessage: "無相關篩選結果",
      searchMessage: "{0} 個相關結果",
      selectionMessage: "{0} 個項目被選取",
      emptySelectionMessage: "無選取項目",
      emptySearchMessage: "無相關搜尋結果",
      emptyMessage: "無可用選項",
      aria: {
        trueLabel: "是",
        falseLabel: "否",
        nullLabel: "未選擇",
        star: "1 顆星",
        stars: "{star} 顆星",
        selectAll: "已選取所有項目",
        unselectAll: "已取消選取所有項目",
        close: "關閉",
        previous: "上一個",
        next: "下一個",
        navigation: "轉導",
        scrollTop: "滾動至頂端",
        moveTop: "移動至頂端",
        moveUp: "往上移動",
        moveDown: "往下移動",
        moveBottom: "移動至底端",
        moveToTarget: "移動至目標",
        moveToSource: "移動至來源",
        moveAllToTarget: "全部移動至目標",
        moveAllToSource: "全部移動至來源",
        pageLabel: "{page}",
        firstPageLabel: "第一頁",
        lastPageLabel: "最後一頁",
        nextPageLabel: "下一頁",
        previousPageLabel: "上一頁",
        rowsPerPageLabel: "每頁行數",
        jumpToPageDropdownLabel: "跳至頁面下拉選單",
        jumpToPageInputLabel: "跳至頁面輸入欄位",
        selectRow: "選取行",
        unselectRow: "取消選取行",
        expandRow: "展開行",
        collapseRow: "收闔行",
        showFilterMenu: "展示篩選選單",
        hideFilterMenu: "隱藏篩選選單",
        filterOperator: "篩選運算子",
        filterConstraint: "篩選條件",
        editRow: "編輯行",
        saveEdit: "儲存編輯",
        cancelEdit: "取消編輯",
        listView: "列表視圖",
        gridView: "網格視圖",
        slide: "滑動",
        slideNumber: "{slideNumber}",
        zoomImage: "放大圖片",
        zoomIn: "放大",
        zoomOut: "縮小",
        rotateRight: "向右旋轉",
        rotateLeft: "向左旋轉",
      },
    });
  }, []);

  useEffect(() => {
    locale(lang);
  }, [lang]);

  useEffect(() => {
    if (date && category) {
      const fetchEventList = async () => {
        const url = `/api/event?date=${new Date(date)
          .toLocaleDateString()
          .replaceAll("/", "-")}&category=${category}`;
        const res = await fetch(url, {
          cache: "no-cache",
        });
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error("Failed to fetch data");
        }
        return res.json();
      };
      fetchEventList().then((data) => {
        setEventList(data);
      });
    }
  }, [date, category]);

  return (
    <PrimeReactProvider>
      <div className="w-full flex flex-col-reverse md:flex-row gap-y-4">
        <div className="flex flex-1">
          {eventList.length == 0 && (
            <Typography varient="h5">
              {lang === "en"
                ? "Sorry, there is no event today."
                : "抱歉，今天沒有活動。"}
            </Typography>
          )}
          {eventList.map((event) => (
            <div key={event._id}>
              <div
                className="flex-1 flex flex-col items-start justify-start w-full mb-4"
                dangerouslySetInnerHTML={{ __html: event.content[lang] }}
              ></div>
              {event?.banner?.length > 0 && (
                <Image
                  src={event.banner}
                  width={300}
                  height={300}
                  alt={event.title[lang]}
                ></Image>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-start items-start p-4 rounded border">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value as Date)}
            inline
            showWeek
          />
        </div>
      </div>
    </PrimeReactProvider>
  );
}
