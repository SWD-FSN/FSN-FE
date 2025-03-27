import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";


const friendRequests = [
  { id: 1, name: "Phạm Minh Nguyệt", mutualFriends: 1, time: "5 ngày", avatar: "https://i.pravatar.cc/50?img=1" },
  { id: 2, name: "Hoà Trương", mutualFriends: 0, time: "22 tuần", avatar: "https://i.pravatar.cc/50?img=2" },
  { id: 3, name: "Nguyễn Gia Kiệt", mutualFriends: 0, time: "6 tuần", avatar: "https://i.pravatar.cc/50?img=3" },
  { id: 4, name: "Nguyễn Đăng Duy", mutualFriends: 1, time: "1 năm", avatar: "https://i.pravatar.cc/50?img=4" },
  { id: 5, name: "Nguyễn Thu Trang", mutualFriends: 0, time: "34 tuần", avatar: "https://i.pravatar.cc/50?img=5" },
];

export default function FriendRequestsPopup() {
  const [requests, setRequests] = useState(friendRequests);

  const handleAccept = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Lời Mời Kết Bạn</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-gray-900 text-white rounded-lg p-4">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Lời mời kết bạn</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {requests.length === 0 ? (
            <p className="text-gray-400 text-center">Không có lời mời nào</p>
          ) : (
            requests.map(({ id, name, mutualFriends, time, avatar }) => (
              <div key={id} className="flex items-center gap-3 border-b pb-3">
                <Avatar className="w-10 h-10">
                  <img src={avatar} alt={name} className="rounded-full" />
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{name}</p>
                  <p className="text-sm text-gray-400">
                    {mutualFriends > 0 ? `${mutualFriends} bạn chung · ` : ""}{time}
                  </p>
                </div>
                <div className="space-x-2">
                  <Button className="bg-blue-500 hover:bg-blue-600" onClick={() => handleAccept(id)}>Xác nhận</Button>
                  <Button variant="destructive" onClick={() => handleDelete(id)}>Xóa</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
