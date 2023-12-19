using System;
class Palindrom
{
	public static void Main(string[])
	{
		int num=int.Parse(Console.ReadLine());
		int num3=num;
		while(num==0)
		{
			int num1=num%10;
			num2=num2+num1*10;
			num/=10;
		}
		if(num2==num3)
		{
			Console.WriteLine("Palindrom");
		}
		else
			Console>WriteLine("Not Palindrom");
	}
}
/* this is multiline command */