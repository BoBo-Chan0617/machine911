#NUMPY的基本操作
#作者:BOBO
#日期:2024-06-20
import numpy as np

arr1 = np.array([1,2,3,4,5])
print(type(arr1))
print("從列表建立的陣列",arr1)

print("===============================")
#建立一個等差數列的陣列v,起始值為1,終止值為10,間隔為2
v = np.arange(1,10,2)
print("等差數列陣列v:",v)
print("="*15)

#建立一個3x4的全零陣列
zero_arr = np.zeros((3,4))
print("3x4的全零陣列:\n",zero_arr)

print("="*15)
#建立一個3*2的全部值為1的陣列
one_arr = np.ones((3,2))
print("3x2的全部值為1的陣列:\n",one_arr)

print("="*15)
#建立一個3x3的單位矩陣
identity_arr = np.eye(3)
print("3x3的單位矩陣:\n",identity_arr)  

print("="*15)
#建立一個3x3的隨機陣列,值介於0到1之間
random_arr = np.random.rand(3,3)
print("3x3的隨機陣列:\n",random_arr)

print("="*15)
#2.陣列基本操作
a = np.array([10,20,30,40])
b = np.array([1,2,3,4])
print("陣列a:",a)
print("陣列b:",b)
print("a + b =",a + b)
print("a - b =",a - b)
print("a * b =",a * b)
print("a / b =",a / b)
print("a的平方 =",a ** 2)
print("a的平方根 =",np.sqrt(a))
print("a的總和 =",np.sum(a))
print("a的平均值 =",np.mean(a))
print("a的最大值 =",np.max(a))
print("a的最小值 =",np.min(a))
print("a的標準差 =",np.std(a))
print("a的變異數 =",np.var(a))
print("a的中位數 =",np.median(a))
print("a的排序 =",np.sort(a))
print("a的反轉 =",np.flip(a))
print("a的索引位置 =",np.where(a > 20))
print("a的獨特值 =",np.unique(a))
print("a的累積和 =",np.cumsum(a))
print("a的累積積 =",np.cumprod(a))  
